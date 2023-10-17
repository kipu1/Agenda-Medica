import { ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation } from "@angular/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { TranslocoModule } from "@ngneat/transloco";
 import { Persona } from "./persona";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatRippleModule } from "@angular/material/core";
import { MatMenuModule } from "@angular/material/menu";
import { MatTabsModule } from "@angular/material/tabs";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { NgApexchartsModule } from "ng-apexcharts";
import { CommonModule, CurrencyPipe, NgClass, NgFor, NgIf } from "@angular/common";

import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { Subject, takeUntil } from "rxjs";
import { PersonaService } from "./persona.service";
import { MatTableDataSource , MatTableModule } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormsModule, NgModel } from "@angular/forms";
import { fuseAnimations } from "@fuse/animations";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";


@Component({
    selector       : 'persona',
    templateUrl    : './persona.component.html',
   
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    standalone     : true,
    imports        : [ NgFor,MatRadioModule, CommonModule,FormsModule ,MatTableModule, MatPaginatorModule,MatButtonModule,MatIconModule,MatInputModule,MatFormFieldModule,MatTableModule,
      MatInputModule],
})
export class PersonaComponent 
{
  displayedColumns: string[] = ['idPersona','cedula', 'primerNombre', 'segundoNombre', 'primerApellido', 'segundoApellido', 'genero', 'fechanacimiento', 'correo', 'direccion', 'telefono','editar'];
  dataSource = new MatTableDataSource<Persona>;
persona:Persona = new Persona();

  
registros: Persona[] = [];

  registrarPersona() {
    // Validar los campos del formulario
    if (!this.persona.cedula || !this.persona.primerNombre || !this.persona.segundoNombre || !this.persona.primerApellido || !this.persona.segundoApellido || !this.persona.genero || !this.persona.fechanacimiento || !this.persona.correo || !this.persona.direccion || !this.persona.telefono) {
      return;
    }
  
    // Realizar la lógica de registro aquí
    this.personaService.savePersona(this.persona).subscribe(dato => {
      console.log(dato);
      // Agregar la persona al estado local (reemplaza 'this.registros' con tu estado local)
      this.registros.push(this.persona);
  
      // Restablecer los campos del formulario después del registro
      this.persona = new Persona(); // Esto restablecerá todos los campos a sus valores iniciales (vacíos)
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
    this.persona = { ...registros }; // Copiamos los datos del registro seleccionado a la variable historias.
  }

    /**
     * Constructor
     */
    constructor(
      private personaService: PersonaService
        
    )
    
    {
      this.registros = [];
      this.dataSource = new MatTableDataSource<Persona>(this.registros);
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
      this.personaService.obtenerListaPersona().subscribe(respuesta => {
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