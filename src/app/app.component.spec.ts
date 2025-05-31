import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";

describe("AppComponent", () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  }));

  it("should create the app", () => {
    expect(component).toBeTruthy();
  });
});
