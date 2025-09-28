import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';
import { finalize } from 'rxjs/operators';
import { timer } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const spinnerService = inject(SpinnerService);

  if (req.headers.has('X-No-Spinner')) {
    return next(req);
  }

  spinnerService.spinner(); 

  return next(req).pipe(
    finalize(() => {
      spinnerService.idle(); 
    })
  );
};
