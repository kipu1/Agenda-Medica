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
import { Doctor } from "./doctor";
import { DoctorService } from "./doctor.service";


@Component({
    selector       : 'doctor',
    templateUrl    : './doctor.component.html',
   
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    standalone     : true,
    imports        : [ NgFor, FormsModule ,MatTableModule, MatPaginatorModule,MatButtonModule,MatIconModule,MatInputModule,MatFormFieldModule,MatTableModule,
      MatInputModule],
})
export class DoctorComponent 
{
  displayedColumns: string[] = ['idDoctor','idRol','nombre','clavesecreta', 'comentarios', 'direccion', 'especialidad',  'telefono', 'clave', 'notaAuto', 'nota', 'comparte', 'cfg', 'cfgsec', 'email', 'extraAsister', 'field'];
  dataSource = new MatTableDataSource<Doctor>;
  doctor:Doctor = new Doctor();

  
registros: Doctor[] = [];

  registrarPersona() {
    // Validar los campos del formulario
    if (!this.doctor.nombre || !this.doctor.clavesecreta || !this.doctor.comentarios || !this.doctor.direccion || !this.doctor.especialidad || !this.doctor.telefono || !this.doctor.clave || !this.doctor.notaAuto || !this.doctor.nota || !this.doctor.comparte || !this.doctor.cfg || !this.doctor.cfgsec || !this.doctor.email || !this.doctor.extraAsister|| !this.doctor.field) {
      return;
    }
  
    // Realizar la lógica de registro aquí
    this.doctorService.savePersona(this.doctor).subscribe(dato => {
      console.log(dato);
      // Agregar la persona al estado local (reemplaza 'this.registros' con tu estado local)
      this.registros.push(this.doctor);
  
      // Restablecer los campos del formulario después del registro
      this.doctor = new Doctor(); // Esto restablecerá todos los campos a sus valores iniciales (vacíos)
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


 

    /**
     * Constructor
     */
    constructor(
      private doctorService: DoctorService
        
    )
    
    {
      this.registros = [];
      this.dataSource = new MatTableDataSource<Doctor>(this.registros);
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
      this.doctorService.obtenerListaPersona().subscribe(respuesta => {
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