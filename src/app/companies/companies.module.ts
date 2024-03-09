import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { CompaniesRoutingModule } from './companies-routing.module';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import { FormPageComponent } from './pages/form-page/form-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';

@NgModule({
  declarations: [
    DetailPageComponent,
    FormPageComponent,
    ListPageComponent
  ],
  imports: [CommonModule, CompaniesRoutingModule, SharedModule],
})
export class CompaniesModule {}
