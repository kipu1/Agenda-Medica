import { ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation } from "@angular/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { TranslocoModule } from "@ngneat/transloco";
 import { Paciente} from "./paciente";
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

import { MatTableDataSource , MatTableModule } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormsModule, NgModel } from "@angular/forms";
import { fuseAnimations } from "@fuse/animations";
import { MatInputModule } from "@angular/material/input";
import { PacientesService } from "./pacientes.service";
import { Router, Routes } from "@angular/router";


@Component({
    selector       : 'actualizarPaciente',
    templateUrl    : './paciente.component.html',
   
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    standalone     : true,
    imports        : [ NgFor, FormsModule ,CommonModule,MatTableModule, MatPaginatorModule,MatButtonModule,MatIconModule,MatInputModule,MatFormFieldModule,MatTableModule,
      MatInputModule],
})
export class PacienteComponent 
{
  displayedColumns: string[] = ['idPaciente','idRol', 'apellido', 'nombre', 'documento', 'fechanacimiento', 'grupo', 'sexo', 'direccion', 'cp', 'obra','afiliado', 'telefono1', 'telefono2', 'telefono3', 'clinicos', 'diagnostico', 'cormobilidades', 'familiar', 'comentarios', 'extra1','extra2','extra3', 'extra4', 'extra5', 'extra6', 'extra7', 'extra8', 'extra9', 'extra10', 'idDoctor', 'campoCfg1','campoCfg2','campoCfg3', 'tipodocumento',  'editar'];
  dataSource = new MatTableDataSource<Paciente>;
  paciente:Paciente = new Paciente();

  static readonly routes: Routes = [
    { path: 'actualizarPaciente/:id', component: PacienteComponent }
  ];
registros: Paciente[] = [];
// || !this.paciente.abrir
actualizarPaciente() {
    // Validar los campos del formulario
    if (!this.paciente.apellido || !this.paciente.nombre || !this.paciente.documento || !this.paciente.fechanacimiento || !this.paciente.grupo || !this.paciente.sexo || !this.paciente.direccion || !this.paciente.cp || !this.paciente.obra || !this.paciente.afiliado|| !this.paciente.telefono1 || !this.paciente.telefono2 || !this.paciente.telefono3 || !this.paciente.clinicos || !this.paciente.diagnostico || !this.paciente.cormobilidades || !this.paciente.familiar || !this.paciente.comentarios|| !this.paciente.extra1 || !this.paciente.extra2 || !this.paciente.extra3 || !this.paciente.extra4 || !this.paciente.extra5 || !this.paciente.extra6 || !this.paciente.extra7 || !this.paciente.extra8 || !this.paciente.extra9|| !this.paciente.extra10 || !this.paciente.campoCfg1 || !this.paciente.campoCfg2 || !this.paciente.campoCfg3 || !this.paciente.tipodocumento   ) {
      return;
    }
  
    // Realizar la lógica de registro aquí
    this.pacienteService.updatePersona(this.paciente.idPaciente, this.paciente).subscribe(dato => {
      console.log(dato);

      // Si la actualización se realizó con éxito, puedes refrescar los datos o realizar otra acción necesaria.
      // Por ejemplo, puedes actualizar la lista de pacientes después de la actualización.

      // Luego, puedes restablecer los campos del formulario si es necesario.
      this.paciente = new Paciente(); // Esto restablecerá todos los campos a sus valores iniciales (vacíos)
  });
}
  applyFilter(event: Event) {
    console.log('Filtering...'); // Verifica si este mensaje aparece en la consola
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  // cargarDatosEnFormulario(registros: any) {
  //   this.paciente = { ...registros };
  //    // Copiamos los datos del registro seleccionado a la variable historias.
  // }

  editarRegistro(idPaciente: number) {
    // Redirige al formulario de edición y pasa el ID del paciente como parámetro
    this.router.navigate(['/paciente', idPaciente]);
  }
    /**
     * Constructor
     */
    constructor(
      private pacienteService: PacientesService,private router:Router
        
    )
    
    {
      this.registros = [];
      this.dataSource = new MatTableDataSource<Paciente>(this.registros);
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
      this.pacienteService.obtenerListaPersona().subscribe(respuesta => {
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