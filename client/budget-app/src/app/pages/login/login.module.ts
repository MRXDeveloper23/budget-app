import { NgModule } from '@angular/core'
import { LoginComponent } from './login.component'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { MatIconModule } from '@angular/material/icon'

@NgModule({
    declarations: [LoginComponent],
    imports: [
        MatInputModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        HttpClientModule,
    ],
    providers: [],
})
export class LoginModule {}
