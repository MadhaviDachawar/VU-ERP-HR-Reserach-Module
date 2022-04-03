import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammeDataYearlyComponent } from './programmedatayearly.component';

describe('ProgrammeDataYearlyComponent', () => {
  let component: ProgrammeDataYearlyComponent;
  let fixture: ComponentFixture<ProgrammeDataYearlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgrammeDataYearlyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgrammeDataYearlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
