import { NgModule,CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';//for using ngif and ngfor
import { Routes, RouterModule }   from '@angular/router';
import { HttpModule,Http,ConnectionBackend} from '@angular/http';
import 'rxjs/add/operator/map';
import { enableProdMode } from '@angular/core'; //enableProdMode();
//Read more at http://tutorials.pluralsight.com/front-end-javascript/debugging-angular-2-applications?status=in-review#1WURxucehQaz14kh.99
//routing config
import { routing,appRoutingProviders } from './main.routes';


import { ShellComponent } from './layout/shell/shell.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import {SaveComponent}from'.././app/save/save.component';

import { QualityComponent } from '../app/quality/quality.component';
import { VelocityComponent } from '../app/velocity/velocity.component';
import { ReportComponent } from '../app/report/report.component';
import { AdminComponent } from '../app/admin/admin.component';
import { AdminService } from '../app/admin/admin.service';
import { AuthService } from '../app/login/auth.service';
import { AuthGuard } from '../app/login/auth-guard.service';
import { LoginComponent} from '../app/login/login.component';
import { LoginService} from '../app/login/loginservice.service';

import { MultiSelectComponent } from '../app/ng2-multiselect/multi.select.component';
import { MultiselectDropdown } from '../app/ng2-multiselect/multiselect-dropdown';
import { SearchFilter } from '../app/ng2-multiselect/multiselect-dropdown';

import { QualityTableComponent } from '../app/quality-table/quality.table.component';
import { QualityDataService } from '../app/quality-table/qualitydata.service';
import { VelocityTableComponent } from '../app/velocity-table/velocity.table.component';
import { VelocityDataService } from '../app/velocity-table/velocitydata.service';

import { ReportDataService } from '../app/report/reportdata.service';

import { GraphComponent } from '../app/report/graph-component/graph.component';
import {nvD3} from 'ng2-nvD3';


import { GenericFilterComponent } from '../app/generic-filter/generic.filter.component';
import { GenericSelectorComponent } from '../app/generic-filter/generic-selector/generic.selector.component';
import { GenericFilterService } from '../app/generic-filter/generic.filter.service';
import { RoleComponent }from'../app/role/role.component';
import { SpinnerComponent } from '../app/spinner/spinner.component';

/**External Modules*/
 import {ToastModule,ToastOptions} from 'ng2-toastr/ng2-toastr';
 //import { RotatingPlaneComponent } from '.././node_modules/ng2-spin-kit/app/spinner/rotating-plane.component';


 let options = <ToastOptions> {
  animate: 'flyRight',
  positionClass: 'toast-top-center',
};

@NgModule({
    declarations: [ 
                    ShellComponent,
                    HeaderComponent,
                    FooterComponent,
                    QualityComponent,
                    VelocityComponent,
                    ReportComponent,
                    AdminComponent,
                    SaveComponent,
                    MultiSelectComponent,
                    MultiselectDropdown,
                    GraphComponent,
                    nvD3,
                    RoleComponent,
                    SearchFilter,
                    QualityTableComponent,
                    LoginComponent,
                    VelocityTableComponent,
                    SpinnerComponent
                    
                 ],//when using a directive ,add it here once and use it every where
    
    imports:    [
                    BrowserModule,
                    FormsModule,
                    routing,
                    HttpModule,
                    ReactiveFormsModule,
                    ToastModule.forRoot(options)
                    
                    //RotatingPlaneComponent


                ],
    
    providers:  [
                    appRoutingProviders,
                    ReportDataService,
                    QualityDataService,
                    VelocityDataService,
                    GenericFilterService,
                    AdminService,
                    LoginService,
                    AuthService,
                    AuthGuard
                ],
    
    bootstrap:  [   ShellComponent  ],
    
    schemas:    [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA  ]
})
export class AppModule {}
