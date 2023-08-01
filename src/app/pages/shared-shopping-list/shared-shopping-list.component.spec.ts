import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedShoppingListComponent } from './shared-shopping-list.component';

describe('SharedShoppingListComponent', () => {
  let component: SharedShoppingListComponent;
  let fixture: ComponentFixture<SharedShoppingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedShoppingListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedShoppingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
