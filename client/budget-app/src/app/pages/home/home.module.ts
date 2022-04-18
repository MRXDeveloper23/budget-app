import { NgModule } from '@angular/core'
import { HomeComponent } from './home.component'
import { MatButtonModule } from '@angular/material/button'
import {
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
} from '@angular/material/sidenav'

@NgModule({
    declarations: [HomeComponent],
    imports: [
        MatButtonModule,
        MatSidenav,
        MatSidenavContainer,
        MatSidenavContent,
    ],
    providers: [],
})
export class HomeModule {}
