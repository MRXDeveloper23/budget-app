import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './pages/home/home.component'
import { LoginComponent } from './pages/login/login.component'
import { SubscriptionsComponent } from './pages/subscriptions/subscriptions.component'
import { Error404Component } from './pages/error404/error404.component'
import { AuthGuard } from './auth/auth.guard'
import { SharedModule } from './shared/shared.module'

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'subcriptions',
        component: SubscriptionsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: '**',
        component: Error404Component,
    },
]

@NgModule({
    imports: [RouterModule.forRoot(routes), SharedModule],
    exports: [RouterModule],
})
export class AppRoutingModule {}
