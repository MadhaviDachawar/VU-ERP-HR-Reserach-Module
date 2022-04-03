import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
    providedIn: 'root'
})
export class NotificationServiceService {

    constructor(private notificationService: NzNotificationService) { }

    success(content: string, title?: string,) {
        if (!!title)
            this.notificationService.create('success', title, content)
        else
            this.notificationService.create('success', 'Success', content)
    }
    successPermanent(content: string, title?: string) {
        this.notificationService.create('success', title, content, { nzDuration: 0 })
        if (!!title)
            this.notificationService.create('success', title, content)
        else
            this.notificationService.create('success', 'Success', content)
    }


    info(content: string, title?: string) {
        if (!!title)
            this.notificationService.create('info', title, content)
        else
            this.notificationService.create('info', 'Information', content)

    }
    infoPermanent(content: string, title?: string) {
        if (!!title)
            this.notificationService.create('info', title, content, { nzDuration: 0 })
        else
            this.notificationService.create('info', 'Information', content, { nzDuration: 0 })
    }


    warning(content: string, title?: string) {
        if (!!title)
            this.notificationService.create('warning', title, content)
        else
            this.notificationService.create('warning', 'Warning', content)
    }
    warningPermanent(content: string, title?: string) {
        if (!!title)
            this.notificationService.create('warning', title, content, { nzDuration: 0 })
        else
            this.notificationService.create('warning', 'Warning', content, { nzDuration: 0 })
    }


    error(content: string, title?: string) {
        if (!!title)
            this.notificationService.create('error', title, content)
        else
            this.notificationService.create('error', 'Error', content)
    }
    errorPermanent(content: string, title?: string) {
        if (!!title)
            this.notificationService.create('error', title, content, { nzDuration: 0 })
        else
            this.notificationService.create('error', 'Error', content, { nzDuration: 0 })
    }
}