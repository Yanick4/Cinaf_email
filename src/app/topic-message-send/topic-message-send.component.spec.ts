import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicMessageSendComponent } from './topic-message-send.component';

describe('TopicMessageSendComponent', () => {
  let component: TopicMessageSendComponent;
  let fixture: ComponentFixture<TopicMessageSendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicMessageSendComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopicMessageSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
