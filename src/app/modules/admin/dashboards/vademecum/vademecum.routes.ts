import { inject } from '@angular/core';
import { Routes } from '@angular/router';

import { VademecumService } from 'app/modules/admin/dashboards/vademecum/vademecum.service';
import { VademecumComponent } from './vademecum.component';

export default [
    {
        path: '',
        component: VademecumComponent,
        resolve: {
            data: () => inject(VademecumService).getData(),
        },
    },
] as Routes;
