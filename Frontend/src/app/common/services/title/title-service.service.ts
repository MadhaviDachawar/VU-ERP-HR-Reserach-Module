import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable, ObservableLike } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitleServiceService {

  private title = new BehaviorSubject<String>('VUERP')
  private title$ = this.title.asObservable();

  constructor(private titleService: Title) { }

  setTitle(title: String) {
    this.title.next(title)
    this.titleService.setTitle("VUERP - " + title)
  }

  getTitle(): Observable<String> {
    return this.title$
  }
}