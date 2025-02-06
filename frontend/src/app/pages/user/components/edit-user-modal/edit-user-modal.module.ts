import { NgModule } from '@angular/core';
import { EditUserModal } from './edit-user-modal';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  exports: [EditUserModal],
  declarations: [EditUserModal],
  imports: [
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
})
export class EditUserModalModule {}
