import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BouttonFavComponent } from './boutton-fav.component';

describe('BouttonFavComponent', () => {
  let component: BouttonFavComponent;
  let fixture: ComponentFixture<BouttonFavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BouttonFavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BouttonFavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
