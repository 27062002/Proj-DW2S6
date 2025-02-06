import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserModel } from '../../model/UserModel';

@Component({
  selector: 'delete-user-modal',
  templateUrl: './delete-user-modal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteUserModal {
  private readonly snackBar = inject(MatSnackBar);
  private readonly baseUrl = process.env['NG_APP_API_URL'];

  constructor(
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public user: UserModel,
    private dialogRef: MatDialogRef<DeleteUserModal>
  ) {}

  deleteUser() {
    this.http
      .delete(`${this.baseUrl}/usuarios/${this.user.id}`)
      .subscribe(() => {
        this.snackBar.open('Usuário removido com sucesso', 'Ok', {
          duration: 1000,
        });
        this.dialogRef.close(true);
      });
  }
}
