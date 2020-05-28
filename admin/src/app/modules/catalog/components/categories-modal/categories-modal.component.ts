
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { NbDialogRef } from '@nebular/theme';
import { BaseModalComponent, IBaseModalComponent } from 'src/app/@shared/components/base-modal/base-modal.component';
import { transformControl } from 'src/app/@shared/components/form-utils';
import { TOOLTIPS } from 'src/assets/texts/tooltips';

import { Category } from 'src/app/@core/models/category.model';


@Component({
  selector: 'sp-categories-modal',
  templateUrl: './categories-modal.component.html',
  styleUrls: ['./categories-modal.component.scss']
})
export class CategoriesModalComponent extends BaseModalComponent<Category> implements OnInit, IBaseModalComponent {
  public titleModalCategory: string;
  public successButtonText: string;

  public categoryForm: FormGroup;

  public tooltipText = TOOLTIPS.CATEGORY_ENABLED;

  constructor(fb: FormBuilder, ref: NbDialogRef<CategoriesModalComponent>) {
    super(fb, ref);
  }

  public ngOnInit() {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      enabled: [false],
    });

    this.actionSelect();
  }

  public createHandler() {
    this.successButtonText = 'Сохранить';
    this.titleModalCategory = 'Добавление категории';
  }

  public updateHandler() {
    this.successButtonText = 'Изменить';
    this.titleModalCategory = 'Изменение категории';
    this.categoryForm.setValue({
      name: this.source.name,
      description: this.source.description,
      enabled: this.source.enabled
    });
  }

  public detailsHandler() {
  }

  public get name() {
    return transformControl(this.categoryForm.get('name'));
  }

  public get description() {
    return transformControl(this.categoryForm.get('description'));
  }

  public get enabled() {
    return transformControl(this.categoryForm.get('enabled'));
  }

  public save() {
    const value = this.categoryForm.value;
    this.ref.close(value);
  }

  public cancel() {
    // this.categoryForm.reset();
    this.ref.close();
  }
}
