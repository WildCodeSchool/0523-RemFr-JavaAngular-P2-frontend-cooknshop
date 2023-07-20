import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanierRecettesComponent } from './panier-recettes.component';

describe('PanierRecettesComponent', () => {
  let component: PanierRecettesComponent;
  let fixture: ComponentFixture<PanierRecettesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanierRecettesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanierRecettesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
