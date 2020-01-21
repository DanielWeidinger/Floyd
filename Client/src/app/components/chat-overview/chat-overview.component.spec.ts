import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatOverviewComponent } from './chat-overview.component';

describe('ChatOverviewComponent', () => {
  let component: ChatOverviewComponent;
  let fixture: ComponentFixture<ChatOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
