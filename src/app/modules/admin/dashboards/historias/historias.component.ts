import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HistoriasService } from 'app/modules/admin/dashboards/historias/historias.service';
import { ApexOptions, NgApexchartsModule } from 'ng-apexcharts';
import { Subject, takeUntil } from 'rxjs';
import { Historias } from './historias';

@Component({
    selector       : 'historias',
    templateUrl    : './historias.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [MatButtonModule, MatIconModule, MatMenuModule, MatDividerModule, NgApexchartsModule, MatTableModule, MatSortModule, NgClass, MatProgressBarModule, CurrencyPipe, DatePipe],
})
export class HistoriasComponent {
    historia: Historias [] = [];
    id_persona: number;
    cedula: string = '';
    primer_nombre: string = '';
    segundo_nombre: string = '';
    primer_apellido: string = '';
    segundo_apellido: string = '';
    genero: string = '';
    fechanacimiento: string = '';
    correo: string = '';
    direccion: string = '';
    telefono: string = '';
    paginator: any;
    dataSource: any;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    data: any;
    recentTransactionsDataSource: any;

    /**
     * Constructor
     */
    constructor(  private historiasService: HistoriasService) {}
   
    ngOnInit(): void
  {
    this.listarpersona();
      // Get the data
      this.historiasService.data$
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((data) =>
          {
              // Store the data
              this.data = data;

              // Store the table data
              this.recentTransactionsDataSource.data = data.recentTransactions;

              // Prepare the chart data
        
          });
  }
listarpersona() {
  this.historiasService.obtenerListaResponsable().subscribe(
    (datos: Historias[]) => {
      this.historia = datos; // Asigna los datos a la propiedad users
      this.dataSource = new MatTableDataSource<Historias>(datos);

      this.dataSource.paginator = this.paginator;
      this.paginator.length = datos.length;
      // Llama a nextPage() después de configurar el paginador
      this.nextPage();
    },
    error => {
      console.error('Ocurrió un error al obtener la lista de Historias :', error);
    }
  );
}
nextPage() {
  if (this.paginator.hasNextPage()) {
    this.paginator.nextPage();
  }
}
// guardarPersona() {
//   // Crea una nueva instancia de Usuario con los datos de la persona
//   const nuevaPersona: Historias = {
//     id_persona: this.id_persona, // Asigna el valor de id_persona
//     cedula: this.cedula,
//     primer_nombre: this.primer_nombre,
//     segundo_nombre: this.segundo_nombre,
//     primer_apellido: this.primer_apellido,
//     segundo_apellido: this.segundo_apellido,
//     genero: this.genero,
//     fechanacimiento: this.fechanacimiento,
//     correo: this.correo,
//     direccion: this.direccion,
//     telefono: this.telefono
//   };

//   // Agrega la nueva persona a la lista de usuarios
//   this.historia.push(nuevaPersona);

//   // Actualiza la fuente de datos de la tabla con la lista actualizada de usuarios
//   this.dataSource = new MatTableDataSource<Historias>(this.historia);

//   // Actualiza el paginador de la tabla si es necesario
//   if (this.paginator) {
//     this.paginator.length = this.historia.length;
//     this.nextPage(); // Llama a nextPage() si es necesario
//   }

//   // Llama al servicio para guardar la persona (puedes implementar esta parte según tus necesidades)
//   this.historiasService.savePersona(nuevaPersona).subscribe(
//     respuesta => {
//       // Aquí puedes manejar la respuesta del servicio si es necesario
//       console.log('Persona guardada con éxito', respuesta);
//     },
//     error => {
//       console.error('Ocurrió un error al guardar la persona:', error);
//     }
//   );
// }

    // redirectToPersona() {
    //   this._router.navigate(['/persona']);
    // }

    
}