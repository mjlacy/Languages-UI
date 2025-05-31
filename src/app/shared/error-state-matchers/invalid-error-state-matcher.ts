import { ErrorStateMatcher } from "@angular/material/core";
import { FormControl, FormGroupDirective } from "@angular/forms";

export class InvalidErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, _: FormGroupDirective): boolean {
    return !!(control && control.invalid && control.touched);
  }
}
