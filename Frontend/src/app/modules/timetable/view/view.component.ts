import { Component, OnInit } from '@angular/core';
import { TitleServiceService } from 'src/app/common/services/title/title-service.service';

@Component({
    selector: 'app-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

    constructor(
        private titleService: TitleServiceService
    ) {
        this.titleService.setTitle('Timetable View')
    }

    ngOnInit(): void {

    }

}
