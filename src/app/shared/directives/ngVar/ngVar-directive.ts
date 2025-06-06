// import {Directive, Input, TemplateRef, ViewContainerRef} from "@angular/core";
//
// @Directive({
//     selector: "[ngVar]",
//     standalone: false
// })
// export class NgVarDirective {
//   @Input()
//   set ngVar(context: any) {
//     this.context.$implicit = this.context.ngVar = context;
//     this.updateView();
//   }
//
//   context: any = {};
//
//   constructor(private vcRef: ViewContainerRef, private templateRef: TemplateRef<any>) {}
//
//   updateView(): void {
//     this.vcRef.clear();
//     this.vcRef.createEmbeddedView(this.templateRef, this.context);
//   }
// }
