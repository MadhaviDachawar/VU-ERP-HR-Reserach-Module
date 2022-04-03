import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpRequestInterceptor } from './common/services/httpRequestInterceptor/httprequestinterceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserModule } from '@angular/platform-browser';
import { DecimalPipe, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//Components
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

// Modules
import { SharedmodulesModule } from './sharedmodules.module';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import en from '@angular/common/locales/en';

import { NzConfig, NZ_CONFIG } from 'ng-zorro-antd/core/config';

const ngZorroConfig: NzConfig = {
    notification: { nzTop: 240, nzPauseOnHover: true, nzPlacement: 'bottomRight', nzAnimate: true, nzMaxStack: 8 }
};

registerLocaleData(en);

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        ResetPasswordComponent
    ],
    imports: [
        SharedmodulesModule,
        RouterModule,
        ReactiveFormsModule,
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        NgxSpinnerModule,
        BrowserAnimationsModule,
    ],
    providers: [
        DecimalPipe,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpRequestInterceptor,
            multi: true
        },
        { provide: NZ_I18N, useValue: en_US },
        { provide: NZ_CONFIG, useValue: ngZorroConfig }
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }