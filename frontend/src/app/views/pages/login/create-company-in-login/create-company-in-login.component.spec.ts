import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCompanyInLoginComponent } from './create-company-in-login.component';

describe('CreateCompanyInLoginComponent', () => {
  let component: CreateCompanyInLoginComponent;
  let fixture: ComponentFixture<CreateCompanyInLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCompanyInLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateCompanyInLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
