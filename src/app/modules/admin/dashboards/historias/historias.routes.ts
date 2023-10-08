import { inject } from '@angular/core';
import { Routes } from '@angular/router';

import { HistoriasService } from 'app/modules/admin/dashboards/historias/historias.service';
import { HistoriasComponent } from './historias.component';

export default [
    {
        path: '',
        component: HistoriasComponent,
        resolve: {
            data: () => inject(HistoriasService).getData(),
        },
    },
] as Routes;
