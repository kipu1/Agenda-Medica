import { ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation } from "@angular/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { TranslocoModule } from "@ngneat/transloco";

import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatRippleModule } from "@angular/material/core";
import { MatMenuModule } from "@angular/material/menu";
import { MatTabsModule } from "@angular/material/tabs";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { NgApexchartsModule } from "ng-apexcharts";
import { CommonModule, CurrencyPipe, DatePipe, NgClass, NgFor, NgIf } from "@angular/common";

import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { Subject, takeUntil } from "rxjs";

import { MatTableDataSource , MatTableModule } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormsModule, NgModel } from "@angular/forms";
import { fuseAnimations } from "@fuse/animations";
import { MatInputModule } from "@angular/material/input";
import { HistoriasService } from "./historias.service";
import { Historias } from "./historias";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "./DialogComponent ";


@Component({
    selector       : 'historias',
    templateUrl    : './historias.component.html',
   
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    standalone     : true,
    imports        : [ NgFor, FormsModule ,CommonModule ,DatePipe ,MatTableModule, MatPaginatorModule,MatButtonModule,MatIconModule,MatInputModule,MatFormFieldModule,MatTableModule,
      MatInputModule],
})
export class HistoriasComponent 
{
  displayedColumns: string[] = ['idHistoria','idPaciente', 'fecha', 'nota', 'idAutor', 'firma','editar'];
  dataSource = new MatTableDataSource<Historias>;
  historias:Historias = new Historias();

  
registros: Historias[] = [];

  registrarPersona() {
    // Validar los campos del formulario
    if (!this.historias.fecha || !this.historias.nota || !this.historias.firma ) {
      return;
    }
  
    // Realizar la lógica de registro aquí
    this.historiasService.savePersona(this.historias).subscribe(dato => {
      console.log(dato);
      // Agregar la persona al estado local (reemplaza 'this.registros' con tu estado local)
      this.registros.push(this.historias);
  
      // Restablecer los campos del formulario después del registro
      this.historias = new Historias(); // Esto restablecerá todos los campos a sus valores iniciales (vacíos)
      // Actualizar el origen de datos de la tabla
      this.dataSource.data = this.registros;
  
      // Actualizar la página de manera discreta
      location.reload();
    });
  }
  applyFilter(event: Event) {
    console.log('Filtering...'); // Verifica si este mensaje aparece en la consola
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  cargarDatosEnFormulario(registros: any) {
    this.historias = { ...registros }; // Copiamos los datos del registro seleccionado a la variable historias.
  }
  abrirDialog(nota: string): void {
    this.dialog.open(DialogComponent, {
      data: { nota}
    });
  }
    /**
     * Constructor
     */
    constructor(
      private historiasService: HistoriasService,private dialog: MatDialog
        
    )
    
    {
      this.registros = [];
      this.dataSource = new MatTableDataSource<Historias>(this.registros);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
      // Ejemplo de identificador de persona
      this.listarRegistros();
    }
  
    listarRegistros(): void {
      this.historiasService.obtenerListaPersona().subscribe(respuesta => {
        // Aquí puedes manejar la respuesta de la solicitud
        this.registros = respuesta;
        // Actualizar el origen de datos de la tabla
        this.dataSource.data = this.registros;
      }, error => {
        // Aquí puedes manejar el error de la solicitud
        console.error(error);
      });
    }
  }