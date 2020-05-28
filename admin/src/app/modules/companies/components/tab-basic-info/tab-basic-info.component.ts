import { Component, OnInit, OnDestroy, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';

import { Company } from 'src/app/@core/models/company.model';
import { Manager, UserRoles } from 'src/app/@core/models/user.model';

import { UserService } from 'src/app/@core/services/api/user/user.service';

import { transformControl } from 'src/app/@shared/components/form-utils';

import {
  BaseModalComponent,
  IBaseModalComponent,
  ActionState,
} from 'src/app/@shared/components/base-modal/base-modal.component';

import { Subscription } from 'rxjs';
import { debounceTime, mergeMap, take } from 'rxjs/operators';

import get from 'lodash-es/get';
import omit from 'lodash-es/omit';
import pick from 'lodash-es/pick';
import assign from 'lodash-es/assign';


const BASIC_PROPS = [
  'name',
  // 'manager',
];

@Component({
  selector: 'sp-companies-tab-basic-info',
  templateUrl: './tab-basic-info.component.html',
  styleUrls: ['./tab-basic-info.component.scss']
})
export class CompaniesTabBasicInfoComponent extends BaseModalComponent<Company>
implements OnInit, OnDestroy, IBaseModalComponent {
  @Input() isActionDetails: boolean;

  @Output() eventCreate = new EventEmitter();
  @Output() eventUpdate = new EventEmitter();

  public successButtonText: string;
  public basicForm: FormGroup;

  public managerList: Manager[];
  public managerInputSubscription: Subscription;
  public selectedManager: Manager;

  constructor(
    protected fb: FormBuilder,
    protected ref: NbDialogRef<CompaniesTabBasicInfoComponent>,
    private userService: UserService,
  ) {
    super(fb, ref);
  }

  ngOnInit() {
    this.basicForm = this.fb.group({
      name: ['', Validators.required],
      manager: ['', Validators.compose(
        [Validators.required, this._managerValidator()]
      )],
    });

    this.actionSelect();

    this._initInputManager();
  }

  ngOnDestroy() {
    !!this.managerInputSubscription && this.managerInputSubscription.unsubscribe();
  }

  public createHandler() {
    this.successButtonText = 'Сохранить';
  }

  public updateHandler() {
    this.successButtonText = 'Изменить';
    this._setBasicForm();
  }

  public detailsHandler() {
    this._setBasicForm();
    this.basicForm.disable();
  }

  private _setBasicForm() {
    this.basicForm.setValue(assign(
      pick(this.source, BASIC_PROPS),
      { manager: (this.source.manager) ? this.source.manager.name : '' },
    ));

    this.selectManager(this.source.manager);
  }

  public saveBasicForm() {
    const formData = this.basicForm.value;

    const basicData = assign(
      omit(formData, ['manager']),
      { managerId: this.selectedManager.id },
    );

    (this.action === ActionState.Create)
      ? this.eventCreate.emit(basicData)
      : this.eventUpdate.emit(basicData);
  }

  public cancel() {
    this.ref.close();
  }

  get name(): FormControl {
    return transformControl(this.basicForm.get('name'));
  }
  get manager(): FormControl {
    return transformControl(this.basicForm.get('manager'));
  }

  public selectManager(managerObj: Manager) {
    this.selectedManager = managerObj;
  }

  public onManagerInputClick() {
    this.userService.searchBy(UserRoles.Manager, this.manager.value)
      .pipe(take(1)).subscribe(data => this.managerList = data.results);
  }

  private _initInputManager() {
    this.managerInputSubscription = this.manager.valueChanges.pipe(
      debounceTime(500),
      mergeMap(name => this.userService.searchBy(UserRoles.Manager, name))
    ).subscribe(data => this.managerList = data.results);
  }

  private _managerValidator(): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      if (c.value && !this.selectedManager) return null;
      return (c.value === get(this.selectedManager, 'name')) ? null : { 'match': false };
    };
  }
}
