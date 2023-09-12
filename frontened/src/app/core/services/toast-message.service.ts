import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastMessageService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private _snackbar: MatSnackBar) { }
  error(message: string) {
    return this._snackbar.open(message,'Error',{
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration:5000
    });
  }

  success(message: string) {
    return this._snackbar.open(message, 'Success',{
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration:2000
      });
    }


}
