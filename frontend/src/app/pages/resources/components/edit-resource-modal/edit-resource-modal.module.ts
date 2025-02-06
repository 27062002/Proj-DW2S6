import { NgModule } from '@angular/core';
import { EditResourceModal } from './edit-resource-modal';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  exports: [EditResourceModal],
  declarations: [EditResourceModal],
  imports: [
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
})
export class EditResourceModalModule {}
