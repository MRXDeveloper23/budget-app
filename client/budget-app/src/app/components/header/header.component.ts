import { Component, OnInit } from '@angular/core'
import { Router, NavigationEnd, Event } from '@angular/router'

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    ngOnInit(): void {}
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
