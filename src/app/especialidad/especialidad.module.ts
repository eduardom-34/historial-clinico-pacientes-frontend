import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompartidoModule } from '../compartido/compartido.module';
import { MaterialModule } from '../material/material.module';
import { EspecialidadService } from './services/especialidad.service';
import { ListadoEspecialidadComponent } from './pages/listado-especialidad/listado-especialidad.component';



@NgModule({
  declarations: [
    ListadoEspecialidadComponent
  ],
  imports: [
    CommonModule,
    CompartidoModule,
    MaterialModule
  ],
  providers: [
    EspecialidadService
  ]
})
export class EspecialidadModule { }
