import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogRoutingModule } from './catalog-routing.module';
import { CategoriesComponent } from './pages';
import { SharedModule } from 'src/app/@shared/shared.module';
import { CategoriesModalComponent } from './components/categories-modal/categories-modal.component';
import { FileUploadModule } from 'ng2-file-upload';

import { CatalogComponent } from './catalog.component';
import { ProductRenderImageComponent } from './components/product-render-image/product-render-image.component';

import { ProductModalComponent } from './components/product-modal/product-modal.component';
import { ProductModalActionsComponent } from './components/product-modal-actions/product-modal-actions.component';
import { ProductModalImagesComponent } from './components/product-modal-images/product-modal-images.component';
import { ProductModalPreviewComponent } from './components/product-modal-preview/product-modal-preview.component';

import { AutocompleteModule } from 'src/app/@shared/components/autocomplete/autocomplete.module';
import { NbDialogModule } from '@nebular/theme';
import { ThemeModule } from 'src/app/@theme/theme.module';

@NgModule({
  declarations: [
    CatalogComponent,
    CategoriesComponent,
    CategoriesModalComponent,
    ProductRenderImageComponent,
    ProductModalComponent,
    ProductModalActionsComponent,
    ProductModalImagesComponent,
    ProductModalPreviewComponent,
  ],
  imports: [
    CommonModule,

    ThemeModule,
    NbDialogModule.forChild({
      hasBackdrop: true,
      closeOnBackdropClick: true,
      closeOnEsc: true,
      hasScroll: true,
      autoFocus: false,
    }),
    FileUploadModule,
    SharedModule,
    AutocompleteModule,
    CatalogRoutingModule,
  ],
  entryComponents: [
    CategoriesModalComponent,
    ProductRenderImageComponent,
    ProductModalComponent,
    ProductModalActionsComponent,
    ProductModalImagesComponent,
    ProductModalPreviewComponent,
  ],
  providers: [],
})
export class CatalogModule { }
