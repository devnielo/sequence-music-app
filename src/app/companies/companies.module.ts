import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { CompaniesRoutingModule } from './companies-routing.module';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import { FormPageComponent } from './pages/form-page/form-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { StoreModule } from '@ngrx/store';
import { companyReducer } from './store/reducers/company.reducers';
import { EffectsModule } from '@ngrx/effects';
import { CompanyEffects } from './store/effects/company.effects';

@NgModule({
  declarations: [DetailPageComponent, FormPageComponent, ListPageComponent],
  imports: [
    CommonModule,
    CompaniesRoutingModule,
    SharedModule,
    StoreModule.forFeature('companies', companyReducer),
    EffectsModule.forFeature([CompanyEffects]),
  ],
})
export class CompaniesModule {}
