import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'add-user-modal',
  styleUrl: './add-user-modal.scss',
  templateUrl: './add-user-modal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddUserModal implements OnInit {
  addUserForm!: FormGroup;
  userTypes: string[] = ['Docente', 'Discente'];
  private readonly snackBar = inject(MatSnackBar);
  private readonly baseUrl = process.env['NG_APP_API_URL'];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dialogRef: MatDialogRef<AddUserModal>
  ) {}

  ngOnInit(): void {
    this.addUserForm = this.fb.group({
      name: ['', [Validators.required]],
      type: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  hasFieldError(field: string) {
    return (
      this.addUserForm.get(field)?.invalid &&
      this.addUserForm.get(field)?.touched
    );
  }

  onSubmit() {
    this.http
      .post(`${this.baseUrl}/usuarios`, this.addUserForm.value)
      .subscribe(() => {
        this.snackBar.open('Usuário cadastrado com sucesso', 'Ok', {
          duration: 1000,
        });
        this.dialogRef.close(true);
      });
  }
}
