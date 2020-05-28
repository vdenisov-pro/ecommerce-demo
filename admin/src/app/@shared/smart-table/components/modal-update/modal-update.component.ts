import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import omit from 'lodash-es/omit';

@Component({
  selector: 'sp-modal-update',
  templateUrl: './modal-update.component.html',
  styleUrls: ['./modal-update.component.sass']
})

export class ModalUpdateComponent implements OnInit {
  @Input() data: object;

  constructor(private ref: NbDialogRef<ModalUpdateComponent>) {}

  ngOnInit() {
    this.data = omit(this.data, 'id');
  }

  cancel() {
    this.ref.close(false);
  }

  submit() {
    this.ref.close(true);
  }
}
