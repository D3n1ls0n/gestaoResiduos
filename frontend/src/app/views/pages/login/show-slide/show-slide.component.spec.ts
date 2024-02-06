import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSlideComponent } from './show-slide.component';

describe('ShowSlideComponent', () => {
  let component: ShowSlideComponent;
  let fixture: ComponentFixture<ShowSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowSlideComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
