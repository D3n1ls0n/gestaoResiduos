import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateClienteInLoginComponent } from './create-cliente-in-login.component';

describe('CreateClienteInLoginComponent', () => {
  let component: CreateClienteInLoginComponent;
  let fixture: ComponentFixture<CreateClienteInLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateClienteInLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateClienteInLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
