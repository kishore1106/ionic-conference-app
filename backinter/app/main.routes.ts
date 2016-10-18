import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';


import { LoginComponent  } from './login/login.component';
import { QualityComponent } from './quality/quality.component';
import { VelocityComponent } from './velocity/velocity.component';
import { ReportComponent } from './report/report.component' ;
import { AdminComponent } from './admin/admin.component' ;
import { AuthGuard  } from './login/auth-guard.service' ;



const appRoutes: Routes = [
  { path: '', redirectTo: 'login',pathMatch: 'full'},//canActivate:[AuthGuard]
  { path: 'login', component: LoginComponent, data: { title: 'Login Page' }  },
  { path: 'quality', component: QualityComponent, data: { title: 'Quality Page' }, canActivate:[AuthGuard]},//, canActivate:[AuthGuard] 
  { path: 'velocity', component: VelocityComponent, data: { title: 'Velocity Page' }, canActivate:[AuthGuard]},
  { path: 'report', component: ReportComponent, data: { title: 'Report Page' }, canActivate:[AuthGuard]},
  { path: 'admin', component: AdminComponent, data: { title: 'Admin Page' }, canActivate:[AuthGuard]}
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
