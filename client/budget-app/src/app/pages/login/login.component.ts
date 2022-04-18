import { Component, Injectable } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '../services/auth.service'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
@Injectable()
export class LoginComponent {
    hide = true
    loginForm: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
    })
    constructor(private authService: AuthService, private router: Router) {}
    onSubmit() {
        const { email, password } = this.loginForm.value
        this.authService.login(email, password).subscribe((data) => {
            console.log('successful login')
            console.log(data)
            this.router.navigateByUrl('/')
        })
    }
}
