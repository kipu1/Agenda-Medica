import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { VademecumComponent } from 'app/modules/admin/dashboards/vademecum/vademecum.component';
import { VademecumService } from 'app/modules/admin/dashboards/vademecum/vademecum.service';

export default [
    {
        path     : '',
        component: VademecumComponent,
        resolve  : {
            data: () => inject(VademecumService).getData(),
        },
    },
] as Routes;
