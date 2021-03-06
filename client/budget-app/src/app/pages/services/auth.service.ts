import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { tap } from 'rxjs/operators'

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private http: HttpClient) {}

    login(email: string, password: string) {
        return this.http
            .post('http://localhost:3000/login', { email, password })
            .pipe(tap((res) => this.setSession(res)))
    }

    isLoggedIn() {
        const expiresIn = localStorage.getItem('expiresIn')
        if (expiresIn) {
            return Date.now() < Number(expiresIn)
        }
        return false
    }

    logout() {
        localStorage.removeItem('expiresIn')
        localStorage.removeItem('idToken')
    }

    private setSession(res: any) {
        const expiresIn = Date.now() + Number(res.expiresIn)
        localStorage.setItem('idToken', res.accessToken)
        localStorage.setItem('expiresIn', String(expiresIn))
    }
}
