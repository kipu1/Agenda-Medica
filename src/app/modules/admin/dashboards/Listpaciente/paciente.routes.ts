import { inject } from '@angular/core';
import { Routes } from '@angular/router';

import { PacientesService } from 'app/modules/admin/dashboards/Listpaciente/pacientes.service';
import { PacienteComponent } from './paciente.component';


export default [
    {
        path: '',
        component: PacienteComponent,
        resolve: {
            data: () => inject(PacientesService).getData(),
        },
    },
] as Routes;
