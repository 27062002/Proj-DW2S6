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
import { ResourceModel } from '../../model/ResourceModel';

@Component({
  selector: 'edit-resource-modal',
  styleUrl: './edit-resource-modal.scss',
  templateUrl: './edit-resource-modal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditResourceModal implements OnInit {
  addResourceForm!: FormGroup;
  resourceTypes: string[] = ['Salas', 'Equipamentos'];
  private readonly snackBar = inject(MatSnackBar);
  private readonly baseUrl = process.env['NG_APP_API_URL'];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public resourceId: number,
    private dialogRef: MatDialogRef<EditResourceModal>
  ) {}

  ngOnInit() {
    this.addResourceForm = this.fb.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      type: ['', [Validators.required]],
    });
    this.http
      .get<ResourceModel>(`${this.baseUrl}/recursos/${this.resourceId}`)
      .subscribe((data) => this.addResourceForm.setValue(data));
  }

  hasFieldError(field: string) {
    return (
      this.addResourceForm.get(field)?.invalid &&
      this.addResourceForm.get(field)?.touched
    );
  }

  onSubmit() {
    this.http
      .put(
        `${this.baseUrl}/recursos/${this.resourceId}`,
        this.addResourceForm.value
      )
      .subscribe(() => {
        this.snackBar.open('Recurso alterado com sucesso', 'Ok', {
          duration: 1000,
        });
        this.dialogRef.close(true);
      });
  }
}
