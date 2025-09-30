import { Component, Inject, inject } from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA,MatDialogModule,} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-confirm-eliminar',
  standalone: true,
  imports: [MatDialogModule, MatIconModule],
  templateUrl: './confirm-eliminar.component.html',
  styleUrl: './confirm-eliminar.component.css',
  
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
