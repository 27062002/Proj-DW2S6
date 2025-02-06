import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResourceModel } from '../../model/ResourceModel';

@Component({
  selector: 'delete-resource-modal',
  templateUrl: './delete-resource-modal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteResourceModal {
  private readonly snackBar = inject(MatSnackBar);
  private readonly baseUrl = process.env['NG_APP_API_URL'];

  constructor(
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public resource: ResourceModel,
    private dialogRef: MatDialogRef<DeleteResourceModal>
  ) {}

  deleteResource() {
    this.http
      .delete(`${this.baseUrl}/recursos/${this.resource.id}`)
      .subscribe(() => {
        this.snackBar.open('Recurso removido com sucesso', 'Ok', {
          duration: 1000,
        });
        this.dialogRef.close(true);
      });
  }
}
