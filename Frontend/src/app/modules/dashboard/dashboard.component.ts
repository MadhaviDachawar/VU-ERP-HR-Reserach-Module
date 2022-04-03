import { Component, OnInit } from '@angular/core';
import { TitleServiceService } from 'src/app/common/services/title/title-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private titleService: TitleServiceService) {
    this.titleService.setTitle('Dashboard')
  }

  ngOnInit(): void {
  }

}
