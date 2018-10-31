import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StaticModule } from '@app/static';
import { ClassesModule } from '@app/classes';
import { ClassesRootComponent } from './classes/classes-root/classes-root.component';
import { ClassFormSmartComponent } from './classes/classes-form/class-form-smart/class-form-smart.component';
import { LandingComponent } from './static/landing/landing.component';
import { SandboxRootComponent } from './sandbox/sandbox-root/sandbox-root.component';
import { AppsRootComponent } from './apps/apps-root/apps-root.component';
import { AppFormSmartComponent } from './apps/apps-form/app-form-smart/app-form-smart.component';
import { GeneratorRootComponent } from './generator/generator-root/generator-root.component';
import { GeneratorBoilerplateComponent } from './generator/generator-boilerplate/generator-boilerplate.component';
import { GeneratorAppComponent } from './generator/generator-app/generator-app.component';
import { GeneratorClassComponent } from './generator/generator-class/generator-class.component';


const routes: Routes = [
    {
        path: '',
        component : LandingComponent
    },
    {
        path: 'classes',
        component: ClassesRootComponent
    },
    {
        path: 'classes/form/:action',
        component: ClassFormSmartComponent
    },
    {
        path : 'apps',
        component : AppsRootComponent
    },
    {
        path : 'apps/form/:action',
        component : AppFormSmartComponent
    },
    {
        path : 'generator',
        component : GeneratorRootComponent
    },
    {
        path : 'generator/boilerplate',
        component : GeneratorBoilerplateComponent
    },
    {
        path : 'generator/app',
        component : GeneratorAppComponent
    },
    {
        path : 'generator/class',
        component : GeneratorClassComponent
    },
    {
        path: 'sandbox',
        component: SandboxRootComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
