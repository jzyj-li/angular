import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotTopicComponent } from './hot-topic.component';

describe('HotTopicComponent', () => {
  let component: HotTopicComponent;
  let fixture: ComponentFixture<HotTopicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotTopicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
