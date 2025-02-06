import { NgModule } from '@angular/core';
import { DeleteUserModal } from './delete-user-modal';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  exports: [DeleteUserModal],
  declarations: [DeleteUserModal],
  imports: [
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
})
export class DeleteUserModalModule {}
