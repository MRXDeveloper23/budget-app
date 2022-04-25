import { NgModule } from '@angular/core'
import { LoginComponent } from './login.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { SharedModule } from 'src/app/shared/shared.module'

@NgModule({
    declarations: [LoginComponent],
    imports: [FormsModule, ReactiveFormsModule, HttpClientModule, SharedModule],
    providers: [],
})
export class LoginModule {}
