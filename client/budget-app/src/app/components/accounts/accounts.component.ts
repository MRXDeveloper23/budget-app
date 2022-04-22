import { Component, Input } from '@angular/core'

@Component({
    selector: 'app-account',
    templateUrl: './accounts.component.html',
    styleUrls: ['./accounts.component.scss'],
})
export class AccountsComponent {
    @Input() name: string = ''
    @Input() balance: string = ''
    @Input() symbol: string = ''

    @Input() selected: boolean = false
    hoveredOn: boolean = false

    onMouseOver() {
        this.hoveredOn = true
    }

    onMouseOut() {
        this.hoveredOn = false
    }

    constructor() {}
}
