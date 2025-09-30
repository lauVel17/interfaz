import { Component, Inject, inject } from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA,MatDialogModule,} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-avisos',
  standalone: true,
  imports: [MatDialogModule, MatIconModule],
  templateUrl: './avisos.component.html',
  styleUrl: './avisos.component.css'
})
export class AvisosComponent {
  constructor(
    public dialogRef: MatDialogRef<AvisosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}



  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
