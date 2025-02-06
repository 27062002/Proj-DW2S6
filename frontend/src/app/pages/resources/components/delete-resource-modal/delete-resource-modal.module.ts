import { NgModule } from '@angular/core';
import { DeleteResourceModal } from './delete-resource-modal';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  exports: [DeleteResourceModal],
  declarations: [DeleteResourceModal],
  imports: [
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
})
export class DeleteResourceModalModule {}
