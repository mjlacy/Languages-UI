import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLanguageComponentComponent } from './add-language.component.component';

describe('AddLanguageComponentComponent', () => {
  let component: AddLanguageComponentComponent;
  let fixture: ComponentFixture<AddLanguageComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddLanguageComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddLanguageComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
