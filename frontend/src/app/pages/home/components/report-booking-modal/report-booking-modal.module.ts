import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReportBookingModal } from './report-booking-modal';

@NgModule({
  exports: [ReportBookingModal],
  declarations: [ReportBookingModal],
  imports: [
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
})
export class ReportBookingModalModule {}
