import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Especialidad } from '../../interfaces/especialidad';
import { EspecialidadService } from '../../services/especialidad.service';
import { CompartidoService } from '../../../compartido/compartido.service';

@Component({
  selector: 'app-modal-especialidad',
  templateUrl: './modal-especialidad.component.html',
  styleUrl: './modal-especialidad.component.css'
})
export class ModalEspecialidadComponent implements OnInit {

  formEspecialidad: FormGroup;
  titulo: string = "Agregar";
  nombreBoton: string = "Guardar";

  constructor(private modal: MatDialogRef<ModalEspecialidadComponent>,
    @Inject(MAT_DIALOG_DATA) public datosEspecialidad: Especialidad,
    private fb: FormBuilder,
    private _especialidadServicio: EspecialidadService,
    private _compartidoServicio: CompartidoService) {
    this.formEspecialidad = this.fb.group({
      nombreEspecialidad: ['', Validators.required],
      descripcion: ['', Validators.required],
      estado: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    if (this.datosEspecialidad != null) {
      this.formEspecialidad.patchValue({
        nombreEspecialidad: this.datosEspecialidad.nombreEspecialidad,
        descripcion: this.datosEspecialidad.descripcion,
        estado: this.datosEspecialidad.estado.toString()
      })
    }
  }

  crearModificarEspecialidad() {
    const especialidad: Especialidad = {
      id: this.datosEspecialidad == null ? 0 : this.datosEspecialidad.id,
      nombreEspecialidad: this.formEspecialidad.value.nombreEspecialidad,
      descripcion: this.formEspecialidad.value.descripcion,
      estado: parseInt(this.formEspecialidad.value.estado)
    }
    if (this.datosEspecialidad == null) {
      //Crear nueva especialidad
      this._especialidadServicio.crear(especialidad).subscribe({
        next: (data) => {
          if (data.isExitoso) {
            this._compartidoServicio.mostrarAlerta('La especialidad ha sido gravada con exito', "Completo");
            this.modal.close("true");
          }
          else {
            this._compartidoServicio.mostrarAlerta("No se pudo crear la especialidad", 'Error!');
          }
        },
        error: (e) => { }
      })
    } else {
      //Editando o actualizando especialidad
      this._especialidadServicio.editar(especialidad).subscribe({
        next: (data) => {
          if (data.isExitoso) {
            this._compartidoServicio.mostrarAlerta('La especialidad ha sido actualizada con exito', "Completo");
            this.modal.close("true");
          }
          else {
            this._compartidoServicio.mostrarAlerta("No se pudo crear la actualizar la especialidad", 'Error!');
          }
        },
        error: (e) => { }
      })

    }
  }

}
