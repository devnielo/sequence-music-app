import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { Error404Page } from './error404-page/error404-page.component';
import { LayoutPageComponent } from './layout-page/layout-page.component';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './components/loader/loader.component';
import { ModalComponent } from './components/modal/modal.component';
import { RatingComponent } from './components/rating-stars/rating-stars.component';
import { StoreModule } from '@ngrx/store';
import { uiReducer } from './store/reducers/ui.reducers'; // Asegúrate de que esta es la ruta correcta

@NgModule({
  declarations: [
    Error404Page,
    SidebarComponent,
    LayoutPageComponent,
    LoaderComponent,
    ModalComponent,
    RatingComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forFeature('ui', uiReducer),
  ],
  exports: [
    SidebarComponent,
    LayoutPageComponent,
    LoaderComponent,
    ModalComponent,
    RatingComponent,
  ],
})
export class SharedModule {}
