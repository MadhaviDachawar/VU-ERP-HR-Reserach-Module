import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyllabusStructureComponent } from './syllabus-structure.component';

describe('SyllabusStructureComponent', () => {
  let component: SyllabusStructureComponent;
  let fixture: ComponentFixture<SyllabusStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SyllabusStructureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SyllabusStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
