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
  selector: 'add-resource-modal',
  styleUrl: './add-resource-modal.scss',
  templateUrl: './add-resource-modal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddResourceModal implements OnInit {
  addResourceForm!: FormGroup;
  private readonly snackBar = inject(MatSnackBar);
  private readonly baseUrl = process.env['NG_APP_API_URL'];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dialogRef: MatDialogRef<AddResourceModal>
  ) {}

  ngOnInit(): void {
    this.addResourceForm = this.fb.group({
      name: ['', [Validators.required]],
      type: ['', [Validators.required]],
    });
  }

  hasFieldError(field: string) {
    return (
      this.addResourceForm.get(field)?.invalid &&
      this.addResourceForm.get(field)?.touched
    );
  }

  onSubmit() {
    this.http
      .post(`${this.baseUrl}/recursos`, this.addResourceForm.value)
      .subscribe(() => {
        this.snackBar.open('Recurso cadastrado com sucesso', 'Ok', {
          duration: 1000,
        });
        this.dialogRef.close(true);
      });
  }
}
