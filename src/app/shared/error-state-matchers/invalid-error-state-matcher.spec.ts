import { FormControl, FormGroupDirective, Validators } from "@angular/forms";
import { InvalidErrorStateMatcher } from "./invalid-error-state-matcher";

describe("InvalidErrorStateMatcher", () => {
  describe("isErrorState()", () => {
    const iesm: InvalidErrorStateMatcher = new InvalidErrorStateMatcher();

    it("should return false if given control is null", () => {
      expect(iesm.isErrorState(null, new FormGroupDirective([], [], undefined))).toBeFalse();
    });

    it("should return false if given control is valid", () => {
      const ctrl: FormControl = new FormControl({
        name: []
      });
      expect(iesm.isErrorState(ctrl, new FormGroupDirective([], [], undefined))).toBeFalse();
    });

    it("should return false if given control is untouched", () => {
      const ctrl: FormControl = new FormControl({
        name: [Validators.required]
      });
      ctrl.markAsUntouched();
      expect(iesm.isErrorState(ctrl, new FormGroupDirective([], [], undefined))).toBeFalse();
    });

    it("should return true if given control is not nullish, is invalid, and is touched", () => {
      const ctrl: FormControl = new FormControl(null, Validators.required);
      ctrl.markAsTouched();
      expect(iesm.isErrorState(ctrl, new FormGroupDirective([], [], undefined))).toBeTrue();
    });
  });
});
