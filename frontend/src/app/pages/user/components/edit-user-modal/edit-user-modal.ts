import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserModel } from '../../model/UserModel';

@Component({
  selector: 'edit-user-modal',
  styleUrl: './edit-user-modal.scss',
  templateUrl: './edit-user-modal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditUserModal implements OnInit {
  addUserForm!: FormGroup;
  userTypes: string[] = ['Docente', 'Discente'];
  private readonly snackBar = inject(MatSnackBar);
  private readonly baseUrl = process.env['NG_APP_API_URL'];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public userId: number,
    private dialogRef: MatDialogRef<EditUserModal>
  ) {}

  ngOnInit() {
    this.addUserForm = this.fb.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      type: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.http
      .get<UserModel>(`${this.baseUrl}/usuarios/${this.userId}`)
      .subscribe((data) =>
        this.addUserForm.setValue({ ...data, password: '' })
      );
  }

  hasFieldError(field: string) {
    return (
      this.addUserForm.get(field)?.invalid &&
      this.addUserForm.get(field)?.touched
    );
  }

  onSubmit() {
    this.http
      .put(`${this.baseUrl}/usuarios/${this.userId}`, this.addUserForm.value)
      .subscribe(() => {
        this.snackBar.open('Usuário alterado com sucesso', 'Ok', {
          duration: 1000,
        });
        this.dialogRef.close(true);
      });
  }
}
