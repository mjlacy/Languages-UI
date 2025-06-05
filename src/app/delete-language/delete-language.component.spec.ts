import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { DeleteLanguageComponent } from "./delete-language.component";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";

describe("DeleteLanguageComponent", () => {
  let component: DeleteLanguageComponent;
  let fixture: ComponentFixture<DeleteLanguageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule
      ],
      declarations: [DeleteLanguageComponent],
      providers : [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {}}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteLanguageComponent);
    component = fixture.componentInstance;
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
