import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatPartnerComponent } from './chat-partner.component';

describe('ChatPartnerComponent', () => {
  let component: ChatPartnerComponent;
  let fixture: ComponentFixture<ChatPartnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatPartnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
