import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutCategorieRecetteComponent } from './ajout-categorie-recette.component';

describe('AjoutCategorieRecetteComponent', () => {
  let component: AjoutCategorieRecetteComponent;
  let fixture: ComponentFixture<AjoutCategorieRecetteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutCategorieRecetteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutCategorieRecetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
