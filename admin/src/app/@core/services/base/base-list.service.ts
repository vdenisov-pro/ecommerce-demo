/* tslint:disable */

import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import find from 'lodash-es/find';
import findIndex from 'lodash-es/findIndex';
import reduce from 'lodash-es/reduce';
import { assign, each, unionBy } from 'lodash-es';

export interface CreateOptions {
  prepend?: boolean;
}

export abstract class BaseListService<T> {
  public list: Observable<T[]>;
  protected _list: BehaviorSubject<T[]>;
  protected dataStore: {
    list: T[];
  };
  private offset = 0;
  private _hasMore = false;
  private _hasLoaded = false;

  // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
  constructor() {
    this.dataStore = { list: [] };
    this._list = <BehaviorSubject<T[]>>new BehaviorSubject([]);
    this.list = this._list.asObservable();
  }

  public load(options?: any): Observable<T[]> {
    options = assign(
      {
        paginationLimit: 20,
        queryParams: undefined,
        immediateClean: false,
        forceLoad: this.getDefaultForceLoad()
      },
      options
    );

    if (!options.forceLoad && this._hasLoaded) {
      return <any>of(this.dataStore.list);
    }

    this.offset = 0;
    const queryParams = assign(
      this.getDefaultQueryParams(),
      options.queryParams
    );
    if (this.hasPagination()) {
      queryParams['limit'] = options.paginationLimit;
      queryParams['offset'] = this.offset;
    }
    if (options.immediateClean) {
      this.clearCache();
    }
    return this.getItemList(queryParams).map(data => {
      this._hasLoaded = true;
      if (this.hasPagination()) {
        const next = data.next;
        data = data.results;
        this.offset += data.length;
        this._hasMore = !!next;
      }
      this.dataStore.list = reduce(
        data,
        (results, value) => {
          const instance = this.createInstance(value);
          if (instance !== undefined) {
            results.push(instance);
          }
          return results;
        },
        []
      );
      this._list.next(this.dataStore.list);
      return this.dataStore.list;
    });
  }

  public loadMore(options?: any): Observable<T[]> {
    options = assign(
      {
        paginationLimit: 20,
        queryParams: undefined
      },
      options
    );
    const queryParams = assign(
      this.getDefaultQueryParams(),
      options.queryParams
    );
    if (this.hasPagination()) {
      queryParams['limit'] = options.paginationLimit;
      queryParams['offset'] = this.offset;
    }

    return this.getItemList(queryParams).map(data => {
      if (this.hasPagination()) {
        const next = data.next;
        data = data.results;
        this.offset += data.length;
        this._hasMore = !!next;
      }
      const result = [];
      each(data, value => {
        const instance = this.createInstance(value);
        if (instance !== undefined) {
          this.dataStore.list.push(instance);
          result.push(instance);
        }
      });
      this._list.next(this.dataStore.list);
      return result;
    });
  }

  public getById(id): Observable<T> {
    const item = find(this.dataStore.list, { id });
    if (item) {
      return <any>of(item);
    }
    return this.loadById(id);
  }

  public loadById(id): Observable<T> {
    return this.getItem(id).map(data => {
      const instance = this.createInstance(data);
      if (instance !== undefined) {
        const index = findIndex(this.dataStore.list, <any>{ id });
        if (index >= 0) {
          this.dataStore.list[index] = instance;
        }
      }
      return instance;
    });
  }

  public getCachedById(id): T {
    return <any>find(this.dataStore.list, { id });
  }

  public addToCache(list: T[]) {
    this.dataStore.list = unionBy(this.dataStore.list, list, 'id');
  }

  public create(object, options?: CreateOptions): Observable<T> {
    return this.createItem(object).map(data => {
      const instance = this.createInstance(data);
      const list = this.dataStore.list;
      if (options && options.prepend) {
        list.unshift(instance);
      } else {
        list.push(instance);
      }
      this._list.next(list);
      return instance;
    });
  }

  public update(object): Observable<T> {
    return this.updateItem(object).map(data => {
      const instance = this.createInstance(data);
      const index = findIndex(this.dataStore.list, <any>{ id: data.id });
      if (index >= 0) {
        this.dataStore.list[index] = instance;
      } else {
        this.dataStore.list.push(instance);
      }
      this._list.next(this.dataStore.list);
      return instance;
    });
  }

  public delete(id): Observable<any> {
    return this.deleteItem(id).map(data => {
      const index = findIndex(this.dataStore.list, <any>{ id });
      if (index >= 0) {
        this.dataStore.list.splice(index, 1);
      }
      this._list.next(this.dataStore.list);
      return data;
    });
  }

  public hasMore(): boolean {
    return this._hasMore;
  }

  protected abstract getPath(): string;

  protected abstract createInstance(data: any): T;

  protected hasPagination(): boolean {
    return false;
  }

  protected getDefaultForceLoad(): boolean {
    return true;
  }

  protected getDefaultQueryParams() {
    return {};
  }

  protected abstract getItemList(queryParams): Observable<any>;

  protected abstract getItem(id): Observable<any>;

  protected abstract createItem(object): Observable<any>;

  protected abstract updateItem(object): Observable<any>;

  protected abstract deleteItem(id): Observable<any>;

  protected clearCache() {
    if (this.dataStore.list && this.dataStore.list.length > 0) {
      this.dataStore.list = [];
      this._list.next(this.dataStore.list);
    }
  }
}
