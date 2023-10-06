import { inject } from '@angular/core';
import { Routes } from '@angular/router';

import { PersonaService } from 'app/modules/admin/dashboards/persona/persona.service';
import { PersonaComponent } from './persona.component';

export default [
    {
        path     : '',
        component: PersonaComponent,
        resolve  : {
            data: () => inject( PersonaService).getData(),
        },
    },
] as Routes;
