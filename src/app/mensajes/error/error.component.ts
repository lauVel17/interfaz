import { Component, Inject, inject } from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA,MatDialogModule,} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-error',
  standalone: true,
  imports: [MatDialogModule, MatIconModule],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {
  constructor(
    public dialogRef: MatDialogRef<ErrorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}



  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
