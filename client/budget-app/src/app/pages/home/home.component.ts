import { HttpErrorResponse } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
// import { Observable } from 'rxjs'
import { User } from '../../types/user.types'

import { CheckUserService } from './check-user.service'

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    user: User | undefined
    selectedAccount: string | null = null

    constructor(
        private router: Router,
        private checkUserService: CheckUserService
    ) {
        this.user = this.router.getCurrentNavigation()?.extras.state?.['user']
    }

    ngOnInit(): void {
        const myObserver = {
            next: (res: User) => {
                this.user = res
            },
            error: (err: HttpErrorResponse) => {
                console.error(err)
                this.router.navigateByUrl('/login')
            },
        }

        if (!this.user) this.checkUserService.getUser().subscribe(myObserver)
    }

    logout(): void {
        localStorage.clear()
    }
}
