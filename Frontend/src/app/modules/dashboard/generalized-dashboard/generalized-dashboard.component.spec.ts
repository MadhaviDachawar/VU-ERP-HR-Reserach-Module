import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralizedDashboardComponent } from './generalized-dashboard.component';

describe('GeneralizedDashboardComponent', () => {
  let component: GeneralizedDashboardComponent;
  let fixture: ComponentFixture<GeneralizedDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralizedDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralizedDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
