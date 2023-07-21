import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRecetteComponent } from './new-recette.component';

describe('NewRecetteComponent', () => {
  let component: NewRecetteComponent;
  let fixture: ComponentFixture<NewRecetteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewRecetteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewRecetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
