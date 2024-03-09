import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { Error404Page } from './error404-page/error404-page.component';
import { LayoutPageComponent } from './layout-page/layout-page.component';
import { RouterModule } from '@angular/router';
import { FloatingButtonComponent } from './components/floating-button/floating-button.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';

@NgModule({
  declarations: [
    Error404Page,
    SidebarComponent,
    LayoutPageComponent,
    FloatingButtonComponent,
    SafeHtmlPipe,
  ],
  imports: [CommonModule, RouterModule],
  exports: [SidebarComponent, LayoutPageComponent, SafeHtmlPipe],
})
export class SharedModule {}
