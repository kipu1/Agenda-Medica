import { inject } from '@angular/core';
import { Routes } from '@angular/router';

import { DoctorService } from 'app/modules/admin/dashboards/doctor/doctor.service';
import { DoctorComponent } from './doctor.component';

export default [
    {
        path: '',
        component: DoctorComponent,
        resolve: {
            data: () => inject(DoctorService).getData(),
        },
    },
] as Routes;
