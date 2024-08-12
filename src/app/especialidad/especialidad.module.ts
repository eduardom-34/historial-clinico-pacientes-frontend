import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompartidoModule } from '../compartido/compartido.module';
import { MaterialModule } from '../material/material.module';
import { EspecialidadComponent } from './pages/especialidad/especialidad.component';



@NgModule({
  declarations: [
    EspecialidadComponent
  ],
  imports: [
    CommonModule,
    CompartidoModule,
    MaterialModule
  ]
})
export class EspecialidadModule { }
