import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DeleteDialogData } from '../shared/models/language.model';

@Component({
    selector: 'app-delete-language',
    templateUrl: './delete-language.component.html',
    styleUrl: './delete-language.component.scss',
    standalone: false
})
export class DeleteLanguageComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteLanguageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteDialogData,
  ) {}
}
