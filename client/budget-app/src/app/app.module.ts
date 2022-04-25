import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HeaderComponent } from './components/header/header.component'
import { FooterComponent } from './components/footer/footer.component'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { AuthInterceptor } from './auth/auth.interceptor'
import { AccountsComponent } from './components/accounts/accounts.component'
import { TransactionsComponent } from './components/transactions/transactions.component'
import { PiggyBankComponent } from './components/piggy-bank/piggy-bank.component'
import { SharedModule } from './shared/shared.module'
import { ActionsComponent } from './components/actions/actions.component'
import { SearchComponent } from './components/search/search.component'
import { LoginModule } from './pages/login/login.module'
import { HomeComponent } from './pages/home/home.component'
import { FormControl } from '@angular/forms'

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        AccountsComponent,
        TransactionsComponent,
        PiggyBankComponent,
        ActionsComponent,
        SearchComponent,
        HomeComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        SharedModule,
        LoginModule,
        FormControl,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
