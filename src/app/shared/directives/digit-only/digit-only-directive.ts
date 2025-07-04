import { Directive, ElementRef, HostListener, inject, Input, OnChanges, SimpleChanges } from "@angular/core";

@Directive({
    selector: "[appDigitOnly]",
    standalone: false
})
export class DigitOnlyDirective implements OnChanges {
  @Input() decimal: boolean = false;
  @Input() decimalSeparator: string = ".";
  @Input() min: number = -Infinity;
  @Input() max: number = Infinity;
  @Input() pattern: string | RegExp = "";
  inputElement: HTMLInputElement;
  private hasDecimalPoint: boolean = false;
  private navigationKeys: string[] = [
    "Backspace",
    "Delete",
    "Tab",
    "Escape",
    "Enter",
    "Home",
    "End",
    "ArrowLeft",
    "ArrowRight",
    "Clear",
    "Copy",
    "Paste"
  ];
  private regex: RegExp | null = null;

  private el: ElementRef = inject(ElementRef);

  constructor() {
    this.inputElement = this.el.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["pattern"]) {
      this.regex = this.pattern ? RegExp(this.pattern) : null;
    }

    if (changes["min"]) {
      const maybeMin: number = Number(this.min);
      this.min = isNaN(maybeMin) ? -Infinity : maybeMin;
    }

    if (changes["max"]) {
      const maybeMax: number = Number(this.max);
      this.max = isNaN(maybeMax) ? Infinity : maybeMax;
    }
  }

  @HostListener("keydown", ["$event"])
  onKeyDown(e: KeyboardEvent): void {
    if (
      this.navigationKeys.indexOf(e.key) > -1 || // Allow: navigation keys: backspace, delete, arrows etc.
      (e.key === "a" && e.ctrlKey === true) || // Allow: Ctrl+A
      (e.key === "c" && e.ctrlKey === true) || // Allow: Ctrl+C
      (e.key === "v" && e.ctrlKey === true) || // Allow: Ctrl+V
      (e.key === "x" && e.ctrlKey === true) || // Allow: Ctrl+X
      (e.key === "a" && e.metaKey === true) || // Allow: Cmd+A (Mac)
      (e.key === "c" && e.metaKey === true) || // Allow: Cmd+C (Mac)
      (e.key === "v" && e.metaKey === true) || // Allow: Cmd+V (Mac)
      (e.key === "x" && e.metaKey === true) || // Allow: Cmd+X (Mac)
      (this.decimal && e.key === this.decimalSeparator && !this.hasDecimalPoint) // Allow: only one decimal point
    ) {
      // let it happen, don't do anything
      return;
    }

    // Ensure that it is a number and stop the keypress
    if (e.key === " " || isNaN(Number(e.key))) {
      e.preventDefault();
    }

    // check the input pattern RegExp
    if (!!this.regex) {
      if (!this.regex.test(this.forecastValue(e.key))) {
        e.preventDefault();
      }
    }

    const newValue: number = Number(this.forecastValue(e.key));

    if (newValue > this.max/* || newValue < this.min*/) {
      e.preventDefault();
    }
  }

  @HostListener("keyup", ["$event"])
  onKeyUp(_: KeyboardEvent): void {
    this.updateDecimalPoint();
  }

  @HostListener("paste", ["$event"])
  onPaste(event: ClipboardEvent): void {
    const pastedInput: string = (event.clipboardData as DataTransfer).getData("text/plain");
    this.pasteData(pastedInput);
    event.preventDefault();
  }

  @HostListener("drop", ["$event"])
  onDrop(event: DragEvent): void {
    const textData: string = (event.dataTransfer as DataTransfer).getData("text");
    this.inputElement.focus();
    this.pasteData(textData);
    event.preventDefault();
  }

  updateDecimalPoint(): void {
    if (this.decimal) {
      this.hasDecimalPoint =
        this.inputElement.value.indexOf(this.decimalSeparator) > -1;
    }
  }

  private pasteData(pastedContent: string): void {
    const sanitizedContent: string = this.sanitizeInput(pastedContent);
    const pasted: boolean = document.execCommand("insertText", false, sanitizedContent);
    if (!pasted) {
      const {selectionStart: start, selectionEnd: end} = this.inputElement;
      this.inputElement.setRangeText(sanitizedContent, start as number, end as number, "end");
    }
    this.updateDecimalPoint();
  }

  private sanitizeInput(input: string): string {
    let result: string;
    if (this.decimal && this.isValidDecimal(input)) {
      const regex: RegExp = new RegExp(`[^0-9${this.decimalSeparator}]`, "g");
      result = input.replace(regex, "");
    } else {
      result = input.replace(/[^0-9]/g, "");
    }

    const maxLength: number = this.inputElement.maxLength;
    if (maxLength > 0) {
      // the input element has maxLength limit
      const allowedLength: number = maxLength - this.inputElement.value.length;
      result = allowedLength > 0 ? result.substring(0, allowedLength) : "";
    }
    return result;
  }

  private isValidDecimal(input: string): boolean {
    if (!this.hasDecimalPoint) {
      return input.split(this.decimalSeparator).length <= 2;
    } else {
      // the input element already has a decimal separator
      const selectedText: string = this.getSelection();
      if (!!selectedText && selectedText.indexOf(this.decimalSeparator) > -1) {
        return input.split(this.decimalSeparator).length <= 2;
      } else {
        return input.indexOf(this.decimalSeparator) < 0;
      }
    }
  }

  private getSelection(): string {
    return this.inputElement.value.substring(
      this.inputElement.selectionStart as number,
      this.inputElement.selectionEnd as number
    );
  }

  private forecastValue(key: string): string {
    const selectionStart: number = this.inputElement.selectionStart as number;
    const selectionEnd: number = this.inputElement.selectionEnd as number;
    const oldValue: string = this.inputElement.value;
    const selection: string = oldValue.substring(selectionStart, selectionEnd);
    return selection
      ? oldValue.replace(selection, key)
      : oldValue.substring(0, selectionStart) +
      oldValue.substring(selectionStart) +
      key;
  }
}
