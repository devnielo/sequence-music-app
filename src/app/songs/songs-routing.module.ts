import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import { FormPageComponent } from './pages/form-page/form-page.component';
import { LayoutPageComponent } from '../shared/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';

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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SongsRoutingModule {}
