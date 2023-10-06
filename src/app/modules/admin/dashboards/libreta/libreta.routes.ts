import { inject } from '@angular/core';
import { Routes } from '@angular/router';

import { LibretaService } from 'app/modules/admin/dashboards/libreta/libreta.service';
import { LibretaComponent } from './libreta.component';

export default [
    {
        path: '',
        component: LibretaComponent,
        resolve: {
            data: () => inject(LibretaService).getData(),
        },
    },
] as Routes;
