import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { HistoriasComponent } from 'app/modules/admin/dashboards/historias/historias.component';
import { HistoriasService } from 'app/modules/admin/dashboards/historias/historias.service';

export default [
    {
        path     : '',
        component: HistoriasComponent,
        resolve  : {
            data: () => inject(HistoriasService).getData(),
        },
    },
] as Routes;
