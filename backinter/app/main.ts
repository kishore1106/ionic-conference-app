
import 'es6-shim';
import 'reflect-metadata';
import 'zone.js/dist/zone';
import 'zone.js/dist/long-stack-trace-zone';

// import { bootstrap } from '@angular/platform-browser-dynamic';
// import { ShellComponent } from './layout/shell/shell.component';
//  import {Http} from '@angular/http';
// import { provideRouter } from '@angular/router'
// import { routes } from './main.routes'
// // import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
// import 'rxjs/Rx';
// import './styles/css/bootstrap.css';
// bootstrap(ShellComponent, [HTTP_PROVIDERS, provideRouter(routes)]);
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule }              from './module';

platformBrowserDynamic().bootstrapModule(AppModule);
