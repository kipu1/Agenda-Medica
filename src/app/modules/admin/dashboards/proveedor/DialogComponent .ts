import { NgFor } from '@angular/common';
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef, } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-dialog',
  template: `
    <h2 class="mt-8 text-4xl font-extrabold tracking-tight leading-tight">Anotaciones</h2>
    <textarea>{{ data.anotaciones }}</textarea>
    <div>
    <button mat-flat-button color="warn" (click)="cerrarDialog()">Cerrar</button>
    </div>
  `,
      encapsulation: ViewEncapsulation.None,
      animations: fuseAnimations,
      standalone     : true,
      imports        : [ NgFor, FormsModule ,MatTableModule, MatPaginatorModule,MatButtonModule,MatIconModule,MatInputModule,MatFormFieldModule,MatTableModule,
        MatInputModule],
  
})
export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { anotaciones: string }
  ) {}

  cerrarDialog(): void {
    this.dialogRef.close();
  }
}