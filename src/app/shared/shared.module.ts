import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error404PageComponentComponent } from './error404-page-component/error404-page-component.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MaterialModule } from '../material/material/material.module';



@NgModule({
  declarations: [
    Error404PageComponentComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    SidebarComponent
  ]
})
export class SharedModule { }
