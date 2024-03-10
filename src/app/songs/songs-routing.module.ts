import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import { FormPageComponent } from './pages/form-page/form-page.component';
import { LayoutPageComponent } from '../shared/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { Error404Page } from '../shared/error404-page/error404-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: '',
        component: ListPageComponent,
      },
      {
        path: 'add',
        component: FormPageComponent,
      },
      {
        path: 'edit/:id',
        component: FormPageComponent,
      },
      {
        path: ':id',
        component: DetailPageComponent,
      },
      {
        path: '**',
        component: Error404Page,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SongsRoutingModule {}
