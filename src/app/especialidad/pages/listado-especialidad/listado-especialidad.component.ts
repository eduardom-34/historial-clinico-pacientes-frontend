import { AfterViewInit, Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { Especialidad } from '../../interfaces/especialidad';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { EspecialidadService } from '../../services/especialidad.service';
import { CompartidoService } from '../../../compartido/compartido.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalEspecialidadComponent } from '../../modales/modal-especialidad/modal-especialidad.component';

@Component({
  selector: 'app-listado-especialidad',
  templateUrl: './listado-especialidad.component.html',
  styleUrl: './listado-especialidad.component.css'
})
export class ListadoEspecialidadComponent implements OnInit, AfterViewInit{


  displayedColumns: string[] = [
    'nombreEspecialidad',
    'descripcion',
    'estado',
    'acciones'
  ];

  dataIncial: Especialidad[] = [];
  dataSource = new MatTableDataSource(this.dataIncial);
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator

  constructor( private _especialidadServicio: EspecialidadService,
               private _compartidoService: CompartidoService,
               private dialog: MatDialog
   ) {}

   nuevoEspecialidad() {
    this.dialog
        .open(ModalEspecialidadComponent, {disableClose: true, width: '400px'})
        .afterClosed()
        .subscribe((resultado) => {
          if(resultado === 'true') this.obtenerEspecialidades();
        })
   }

   editarEspecialiad( especialidad: Especialidad ) {
    this.dialog
        .open(ModalEspecialidadComponent, {disableClose: true, width: '400px', data: especialidad})
        .afterClosed()
        .subscribe((resultado) => {
          if(resultado === 'true') this.obtenerEspecialidades();
        })
   }

   obtenerEspecialidades() {
    this._especialidadServicio.lista().subscribe({
      next: (data) => {
        if(data.isExitoso) {
          this.dataSource = new MatTableDataSource(data.resultado);
          this.dataSource.paginator = this.paginacionTabla;
        }
        else
          this._compartidoService.mostrarAlerta(
            'No se encontraron datos', 'Advertencia!'
          );
      },
      error: (e) => {}
    });
   }

  ngOnInit(): void {
    this.obtenerEspecialidades();

  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginacionTabla;
  }


}
