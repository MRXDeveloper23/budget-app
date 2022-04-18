import { Component } from '@angular/core'
import { Router, NavigationEnd, Event } from '@angular/router'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'budget-app'
    menus = [
        {
            link: '/categories',
            title: 'Categories',
        },
        {
            link: '/statistics',
            title: 'Statistics',
        },
        {
            link: '/admin',
            title: 'Admin',
        },
    ]
    currentRoute = ''
    constructor(private router: Router) {
        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                this.currentRoute = event.url
            }
        })
    }
}
