import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversityStructureComponent } from './university-structure.component';

describe('UniversityStructureComponent', () => {
  let component: UniversityStructureComponent;
  let fixture: ComponentFixture<UniversityStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UniversityStructureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversityStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
