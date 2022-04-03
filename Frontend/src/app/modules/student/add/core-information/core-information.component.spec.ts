import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreInformationComponent } from './core-information.component';

describe('CoreInformationComponent', () => {
  let component: CoreInformationComponent;
  let fixture: ComponentFixture<CoreInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoreInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
