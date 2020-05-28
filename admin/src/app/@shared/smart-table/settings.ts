import { ActionState } from '../components/base-modal/base-modal.component';

// TODO: change to eva icons when it will be available
// https://github.com/akveo/ng2-smart-table/issues/1034

export const defaultSettings = {
  actions: {
    columnTitle: '',
    position: 'right',
    edit: false,
    delete: false,
    custom: [
      {
        name: ActionState.Update,
        title: `<i class="nb-edit"></i>`
      },
      {
        name: ActionState.Remove,
        title: `<i class="nb-trash"></i>`
      },
    ],
  },
  mode: 'external',
  add: {
    addButtonContent: '<i class="nb-plus"></i>',
    confirmCreate: false
  },
};
