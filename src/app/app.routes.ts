import { Route } from '@angular/router';
import { initialDataResolver } from 'app/app.resolvers';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/dashboards/project'
    {path: '', pathMatch : 'full', redirectTo: 'dashboards/project'},

    // Redirect signed-in user to the '/dashboards/project'
    //
    // After the user signs in, the sign-in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'dashboards/project'},

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.routes')},
            {path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.routes')},
            {path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.routes')},
            {path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.routes')},
            {path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.routes')}
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.routes')},
            {path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.routes')}
        ]
    },

    // Landing routes
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'home', loadChildren: () => import('app/modules/landing/home/home.routes')},
        ]
    },

    // Admin routes
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: initialDataResolver
        },
        children: [

            // Dashboards
            {path: 'dashboards', children: [
                {path: 'libreta', loadChildren: () => import('app/modules/admin/dashboards/libreta/libreta.routes')},
                {path: 'doctor', loadChildren: () => import('app/modules/admin/dashboards/doctor/doctor.routes')},
                {path: 'personas', loadChildren: () => import('app/modules/admin/dashboards/persona/persona.routes')},

                {path: 'proveedor', loadChildren: () => import('app/modules/admin/dashboards/proveedor/proveedor.routes')},
                {path: 'paciente', loadChildren: () => import('app/modules/admin/dashboards/paciente/paciente.routes')},
                {path: 'Listpacientes', loadChildren: () => import('app/modules/admin/dashboards/Listpaciente/paciente.routes')},
                {path: 'historias', loadChildren: () => import('app/modules/admin/dashboards/historias/historias.routes')},
                {path: 'vademecum', loadChildren: () => import('app/modules/admin/dashboards/vademecum/vademecum.routes')},
                {path: 'project', loadChildren: () => import('app/modules/admin/dashboards/project/project.routes')},
                
            ]},
            {
                path: '',
                canActivate: [AuthGuard],
                canActivateChild: [AuthGuard],
                component: LayoutComponent,
                resolve: {
                    initialData: initialDataResolver
                },
                children: [
        
                    // Dashboards
                    {path: 'project', children: [
                        {path: 'libretas', loadChildren: () => import('app/modules/admin/dashboards/libreta/libreta.routes')},
                        {path: 'doctor', loadChildren: () => import('app/modules/admin/dashboards/doctor/doctor.routes')},
                        {path: 'personas', loadChildren: () => import('app/modules/admin/dashboards/persona/persona.routes')},
        
                        {path: 'proveedor', loadChildren: () => import('app/modules/admin/dashboards/proveedor/proveedor.routes')},
                        {path: 'paciente', loadChildren: () => import('app/modules/admin/dashboards/paciente/paciente.routes')},
                        {path: 'Listpacientes', loadChildren: () => import('app/modules/admin/dashboards/Listpaciente/paciente.routes')},
                        {path: 'historias', loadChildren: () => import('app/modules/admin/dashboards/historias/historias.routes')},
                        {path: 'vademecum', loadChildren: () => import('app/modules/admin/dashboards/vademecum/vademecum.routes')},
                        {path: 'project', loadChildren: () => import('app/modules/admin/dashboards/project/project.routes')},
                        
                    ]},
            // Apps
           
        ]}
]}
];