import { Component, inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DeleteDialogData } from "../shared/models/language.model";

@Component({
    selector: "app-delete-language",
    templateUrl: "./delete-language.component.html",
    styleUrl: "./delete-language.component.scss",
    standalone: false
})
export class DeleteLanguageComponent {
  private _: MatDialogRef<DeleteLanguageComponent> = inject(MatDialogRef<DeleteLanguageComponent>);
  protected data: DeleteDialogData = inject(MAT_DIALOG_DATA);
}
