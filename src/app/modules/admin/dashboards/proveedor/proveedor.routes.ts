import { inject } from '@angular/core';
import { Routes } from '@angular/router';

import { ProveedorService } from 'app/modules/admin/dashboards/proveedor/proveedor.service';
import { ProveedorComponent } from './proveedor.component';

export default [
    {
        path: '',
        component: ProveedorComponent,
        resolve: {
            data: () => inject(ProveedorService).getData(),
        },
    },
] as Routes;
