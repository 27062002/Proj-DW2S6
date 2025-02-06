import { HttpClient } from '@angular/common/http';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { format } from 'date-fns';

interface User {
  id: number;
  name: string;
}

interface Resource {
  id: number;
  name: string;
}

interface Booking {
  id: number;
  startDate: string;
  endDate: string;
  resource: Resource;
  user_id: User;
}

@Component({
  selector: 'report-booking-modal',
  styleUrl: './report-booking-modal.scss',
  templateUrl: './report-booking-modal.html',
})
export class ReportBookingModal implements OnInit {
  private readonly snackBar = inject(MatSnackBar);
  private readonly dateFormat = 'dd/MM/yyyy';
  private readonly baseUrl = process.env['NG_APP_API_URL'];

  reportBookingForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public booking: Booking,
    private dialogRef: MatDialogRef<ReportBookingModal>
  ) {}

  ngOnInit(): void {
    this.reportBookingForm = this.fb.group({
      description: ['', [Validators.required]],
    });
  }

  hasFieldError(field: string) {
    return (
      this.reportBookingForm.get(field)?.invalid &&
      this.reportBookingForm.get(field)?.touched
    );
  }

  onSubmit() {
    this.http
      .post(
        `${this.baseUrl}/chamados/criar-chamado`,
        {
          user_id: this.booking.user_id,
          resource_id: this.booking.resource,
          open_date: format(new Date(), this.dateFormat),
          problem: this.reportBookingForm.value.description,
        },
        { responseType: 'text' }
      )
      .subscribe(() => {
        this.snackBar.open('Problema reporta com sucesso', 'Ok', {
          duration: 2000,
        });
        this.dialogRef.close(true);
      });
  }
}
