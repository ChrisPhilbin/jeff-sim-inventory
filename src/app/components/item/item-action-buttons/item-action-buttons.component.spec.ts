import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemActionButtonsComponent } from './item-action-buttons.component';

describe('ItemActionButtonsComponent', () => {
  let component: ItemActionButtonsComponent;
  let fixture: ComponentFixture<ItemActionButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemActionButtonsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemActionButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
