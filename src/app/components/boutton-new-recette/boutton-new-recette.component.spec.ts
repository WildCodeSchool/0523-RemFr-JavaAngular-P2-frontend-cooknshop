import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BouttonNewRecetteComponent } from './boutton-new-recette.component';

describe('BouttonNewRecetteComponent', () => {
  let component: BouttonNewRecetteComponent;
  let fixture: ComponentFixture<BouttonNewRecetteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BouttonNewRecetteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BouttonNewRecetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
