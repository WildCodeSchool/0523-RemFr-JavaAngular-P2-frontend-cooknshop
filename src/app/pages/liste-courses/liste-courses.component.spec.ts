import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCoursesComponent } from './liste-courses.component';

describe('ListeCoursesComponent', () => {
  let component: ListeCoursesComponent;
  let fixture: ComponentFixture<ListeCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeCoursesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
