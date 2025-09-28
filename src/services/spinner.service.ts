import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private spinnerRequestCount = 0;

  constructor(private spinnerService: NgxSpinnerService) {}

  spinner(): void {
    this.spinnerRequestCount++;

    if (this.spinnerRequestCount === 1) {
      this.spinnerService.show(undefined, {});
    }
  }

  idle(): void {
    this.spinnerRequestCount--;

    if (this.spinnerRequestCount < 0) {
      this.spinnerRequestCount = 0;
    }

    if (this.spinnerRequestCount === 0) {
      this.spinnerService.hide();
    }
  }
}
