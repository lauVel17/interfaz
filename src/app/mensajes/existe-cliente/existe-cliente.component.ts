import { Component, Inject, inject } from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA,MatDialogModule,} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-existe-cliente',
  standalone: true,
  imports: [MatDialogModule, MatIconModule],
  templateUrl: './existe-cliente.component.html',
  styleUrl: './existe-cliente.component.css'
})
export class ExisteClienteComponent {

  constructor(
    public dialogRef: MatDialogRef<ExisteClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}



  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
