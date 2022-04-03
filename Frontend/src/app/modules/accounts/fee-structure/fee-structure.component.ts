import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TitleServiceService } from 'src/app/common/services/title/title-service.service';
import { ViewComponent } from './view/view.component';

@Component({
    selector: 'app-fee-structure',
    templateUrl: './fee-structure.component.html',
    styleUrls: ['./fee-structure.component.scss']
})
export class FeeStructureComponent implements OnInit {

    selected = new FormControl(0);

    @ViewChild(ViewComponent)
    private viewComponent!: ViewComponent;

    constructor(private titleService: TitleServiceService) {
        this.titleService.setTitle("Fee Structure View")
    }

    ngOnInit() { }

    tabChange(event: any) {
        if (event.index == 0) {
            this.titleService.setTitle("Fee Structure View")
            this.viewComponent.setData()
        } else if (event.index == 1) {
            this.titleService.setTitle("Fee Structure Add")
        } else {
            this.titleService.setTitle("Fee Structure")
        }
    }
}