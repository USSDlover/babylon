import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartoonRoomComponent } from './cartoon-room.component';

describe('CartoonRoomComponent', () => {
  let component: CartoonRoomComponent;
  let fixture: ComponentFixture<CartoonRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartoonRoomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartoonRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
