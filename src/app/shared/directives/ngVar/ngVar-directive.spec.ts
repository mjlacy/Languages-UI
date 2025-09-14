// import {Component} from "@angular/core";
// import {ComponentFixture, TestBed} from "@angular/core/testing";
// import { NgVarDirective } from "./ngVar-directive";
//
// @Component({
//     selector: "app-container",
//     template: `
//     <div *ngVar="'Test' as TEST">
//       <h1>{{ TEST }}</h1>
//       @if (TEST) {
//         <h2>{{ TEST }} 2</h2>
//       }
//     </div>
//     `,
//     standalone: false
// })
// class ContainerComponent {}
//
// describe("NgVarDirective", () => {
//   let fixture: ComponentFixture<ContainerComponent>;
//
//   beforeEach(() => {
//     fixture = TestBed.configureTestingModule({
//       declarations: [NgVarDirective, ContainerComponent]
//     }).createComponent(ContainerComponent);
//   });
//
//   it("should pass the variable from the parent element so a child can interpolate the value", async () => {
//     fixture.whenStable().then(() => {
//       const h1: HTMLHeadingElement = fixture.nativeElement.querySelector("h1");
//       expect(h1.innerText).toBe("Test");
//     });
//   });
//
//   it("should pass the variable from the parent element so it can be used by other directives", async () => {
//     fixture.whenStable().then(() => {
//       const h2: HTMLHeadingElement = fixture.nativeElement.querySelector("h2");
//       expect(h2).not.toBeNull();
//       expect(h2.innerText).toBe("Test 2");
//     });
//   });
// });
