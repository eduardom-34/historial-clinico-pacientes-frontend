import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Medico } from '../../interfaces/medico';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MedicoService } from '../../services/medico.service';
import { CompartidoService } from '../../../compartido/compartido.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalMedicoComponent } from '../../modales/modal-medico/modal-medico.component';

@Component({
  selector: 'app-listado-medico',
  templateUrl: './listado-medico.component.html',
  styleUrl: './listado-medico.component.css'
})
export class ListadoMedicoComponent implements OnInit, AfterViewInit {


  displayedColumns: string[] = [
    'apellidos',
    'nombres',
    'telefono',
    'genero',
    'nombreEspecialidad',
    'estado',
    'acciones'
  ];

  dataInicial: Medico[] = [];
  dataSource = new MatTableDataSource(this.dataInicial);
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(
    private _medicoServicio: MedicoService,
    private _compartidoServicio: CompartidoService,
    private dialog: MatDialog
  ) { }

  ObtenerMedicos() {
    this._medicoServicio.lista().subscribe({
      next: (data) => {
        if (data.isExitoso) {
          this.dataSource = new MatTableDataSource(data.resultado);
          this.paginator = this.paginator;
        }
        else
          this._compartidoServicio.mostrarAlerta('No se econtraron datos', 'Advertencia!');
      },
      error: (e) => { }
    })
  }

  nuevoMedico() {
    this.dialog
        .open(ModalMedicoComponent, {disableClose: true, width: '600px'})
        .afterClosed()
        .subscribe((resultado) => {
          if(resultado === 'true') this.ObtenerMedicos();
        });
  }

  editarMedico( medico: Medico ) {

  }

  removerMedico( medico: Medico ){

  }

  aplicarFiltroListado( event: Event ){
    const filterValue = (event.target as HTMLInputElement ).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.ObtenerMedicos();

  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

}
