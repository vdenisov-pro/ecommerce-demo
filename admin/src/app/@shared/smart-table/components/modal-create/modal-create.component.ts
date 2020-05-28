import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import omit from 'lodash-es/omit';

@Component({
  selector: 'sp-modal-create',
  templateUrl: './modal-create.component.html',
  styleUrls: ['./modal-create.component.sass']
})

export class ModalCreateComponent implements OnInit {
  @Input() data: object;

  constructor(private ref: NbDialogRef<ModalCreateComponent>) { }

  ngOnInit() {
    this.data = omit(this.data, 'id');
  }

  public cancel() {
    this.ref.close(false);
  }

  public submit() {
    this.ref.close(true);
  }
}
