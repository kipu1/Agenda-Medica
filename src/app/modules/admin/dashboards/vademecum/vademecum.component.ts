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
import { CurrencyPipe, NgClass, NgFor, NgIf } from "@angular/common";

import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { Subject, takeUntil } from "rxjs";

import { MatTableDataSource , MatTableModule } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormsModule, NgModel } from "@angular/forms";
import { fuseAnimations } from "@fuse/animations";
import { MatInputModule } from "@angular/material/input";
import { VademecumService } from "./vademecum.service";
import { Vademecum } from "./vademecum";

import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "./DialogComponent ";


@Component({
    selector       : 'vademecum',
    templateUrl    : './vademecum.component.html',
   
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    standalone     : true,
    imports        : [ NgFor, FormsModule ,MatTableModule, MatPaginatorModule,MatButtonModule,MatIconModule,MatInputModule,MatFormFieldModule,MatTableModule,
      MatInputModule],
})
export class VademecumComponent 
{
  displayedColumns: string[] = ['id','idDoctor', 'compartido', 'laboratorio', 'medicamento', 'composicion', 'indicaciones', 'contraindicaciones', 'posologia', 'idCategoria', 'equivalencias','anotaciones','stock','editar'];
  dataSource = new MatTableDataSource<Vademecum>;
  vademecums:Vademecum = new Vademecum();

  
registros: Vademecum[] = [];

  registrarPersona() {
    // Validar los campos del formulario
    if (!this.vademecums.compartido || !this.vademecums.laboratorio || !this.vademecums.medicamento || !this.vademecums.composicion || !this.vademecums.indicaciones || !this.vademecums.contraindicaciones || !this.vademecums.posologia || !this.vademecums.equivalencias || !this.vademecums.anotaciones || !this.vademecums.stock) {
      return;
    }
  
    // Realizar la lógica de registro aquí
    this.vademecumService.savePersona(this.vademecums).subscribe(dato => {
      console.log(dato);
      // Agregar la persona al estado local (reemplaza 'this.registros' con tu estado local)
      this.registros.push(this.vademecums);
  
      // Restablecer los campos del formulario después del registro
      this.vademecums = new Vademecum(); // Esto restablecerá todos los campos a sus valores iniciales (vacíos)
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
    this.vademecums = { ...registros }; // Copiamos los datos del registro seleccionado a la variable historias.
  }
  abrirDialog(anotaciones: string): void {
    this.dialog.open(DialogComponent, {
      data: { anotaciones}
    });
  }

    /**
     * Constructor
     */
    constructor(
      private vademecumService:VademecumService,private dialog: MatDialog
        
    )
    
    {
      this.registros = [];
      this.dataSource = new MatTableDataSource<Vademecum>(this.registros);
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
      this.vademecumService.obtenerListaPersona().subscribe(respuesta => {
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