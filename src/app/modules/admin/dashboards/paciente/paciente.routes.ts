import { inject } from '@angular/core';
import { Routes } from '@angular/router';

import { PacienteService } from 'app/modules/admin/dashboards/paciente/paciente.service';
import { PacienteComponent } from './paciente.component';

export default [
    {
        path: '',
        component: PacienteComponent,
        resolve: {
            data: () => inject(PacienteService).getData(),
        },
    },
] as Routes;
