import { CurrencyPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { LibretaService } from 'app/modules/admin/dashboards/libreta/libreta.service';
import { ApexOptions, NgApexchartsModule } from 'ng-apexcharts';
import { Subject, takeUntil } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { fuseAnimations } from '@fuse/animations';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { Libreta } from './libreta';
import { DialogComponent } from './DialogComponent ';
import { MatDialog } from '@angular/material/dialog';
@Component({
    selector       : 'libreta',
    templateUrl    : './libreta.component.html',
    
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    standalone     : true,
    imports        : [ NgFor, FormsModule ,MatTableModule, MatPaginatorModule,MatButtonModule,MatIconModule,MatInputModule,MatFormFieldModule,MatTableModule,
      MatInputModule],
})
export class LibretaComponent 
{
    displayedColumns: string[] = ['idLibreta', 'nombre', 'telefono', 'celular', 'email', 'web', 'direccion', 'notas','editar'];
    dataSource = new MatTableDataSource<Libreta>;
    libreta:Libreta = new Libreta();
    mostrarFormulario = false;
    
  registros: Libreta[] = [];
  
    registrarPersona() {
      // Validar los campos del formulario
      if (!this.libreta.nombre || !this.libreta.telefono || !this.libreta.celular || !this.libreta.email || !this.libreta.web || !this.libreta.direccion || !this.libreta.notas ) {
        return;
      }
    
      // Realizar la lógica de registro aquí
      this.libretaService.savePersona(this.libreta).subscribe(dato => {
        console.log(dato);
        // Agregar la persona al estado local (reemplaza 'this.registros' con tu estado local)
        this.registros.push(this.libreta);

        // Restablecer los campos del formulario después del registro
        this.libreta = new Libreta(); // Esto restablecerá todos los campos a sus valores iniciales (vacíos)

        // Ocultar el formulario
        this.mostrarFormulario = false;

        // Actualizar el origen de datos de la tabla
        this.dataSource.data = this.registros;
        this.mostrarFormulario = false;
    });
}
    applyFilter(event: Event) {
      console.log('Filtering...'); // Verifica si este mensaje aparece en la consola
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  
    toggleFormulario() {
      this.mostrarFormulario = !this.mostrarFormulario;
    }
    cargarDatosEnFormulario(registros: any) {
      this.libreta = { ...registros }; // Copiamos los datos del registro seleccionado a la variable historias.
    }
    abrirDialog(notas: string): void {
      this.dialog.open(LibretaComponent, {
        data: { notas}
      });
    }
  
      /**
       * Constructor
       */
      constructor(
        private libretaService: LibretaService,private dialog: MatDialog
          
      )
      
      {
        this.registros = [];
        this.dataSource = new MatTableDataSource<Libreta>(this.registros);
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
        this.libretaService.obtenerListaPersona().subscribe(respuesta => {
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