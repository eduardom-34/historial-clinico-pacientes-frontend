import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from '../material/material.module';
import { LayoutRoutingModule } from './layout-routing.module';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    LayoutComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    LayoutRoutingModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    LayoutComponent,
    DashboardComponent
  ]
})
export class CompartidoModule { }
