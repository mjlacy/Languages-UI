import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteLanguageComponent } from './delete-language.component';

describe('DeleteLanguageComponent', () => {
  let component: DeleteLanguageComponent;
  let fixture: ComponentFixture<DeleteLanguageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteLanguageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteLanguageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
