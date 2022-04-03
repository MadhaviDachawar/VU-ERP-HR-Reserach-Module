import { Component, OnInit } from '@angular/core';
import { TitleServiceService } from 'src/app/common/services/title/title-service.service';

@Component({
    selector: 'app-syllabus-structure',
    templateUrl: './syllabus-structure.component.html',
    styleUrls: ['./syllabus-structure.component.scss']
})
export class SyllabusStructureComponent implements OnInit {

    constructor(private titleService: TitleServiceService) {
        this.titleService.setTitle("Syllabus Structure")
    }

    ngOnInit(): void {

    }
}
