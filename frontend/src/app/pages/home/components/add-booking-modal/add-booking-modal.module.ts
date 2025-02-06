import { NgModule } from '@angular/core';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { AddBookingModal } from './add-booking-modal';

@NgModule({
  exports: [AddBookingModal],
  declarations: [AddBookingModal],
  imports: [
    NgxMaskPipe,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    NgxMaskDirective,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDatepickerModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    provideNativeDateAdapter(),
  ],
})
export class AddBookingModalModule {}
