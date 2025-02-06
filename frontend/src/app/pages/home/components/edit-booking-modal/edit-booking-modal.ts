import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { ReportBookingModal } from '../report-booking-modal/report-booking-modal';

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
  selector: 'edit-booking-modal',
  styleUrl: './edit-booking-modal.scss',
  templateUrl: './edit-booking-modal.html',
})
export class EditBookingModal implements OnInit {
  private booking: Booking | null = null;
  private readonly snackBar = inject(MatSnackBar);
  private readonly baseUrl = process.env['NG_APP_API_URL'];

  users: User[] = [];
  resources: Resource[] = [];
  editBookingForm!: FormGroup;

  readonly dialog = inject(MatDialog);

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dialogRef: MatDialogRef<EditBookingModal>,
    @Inject(MAT_DIALOG_DATA) public bookingId: number
  ) {}

  ngOnInit(): void {
    this.editBookingForm = this.fb.group({
      id: [this.bookingId, [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      user_id: ['', [Validators.required]],
      resource_id: ['', [Validators.required]],
    });
    forkJoin({
      users: this.http.get<User[]>(`${this.baseUrl}/usuarios`),
      resources: this.http.get<Resource[]>(`${this.baseUrl}/recursos`),
      booking: this.http.get<Booking>(
        `${this.baseUrl}/reservas/${this.bookingId}`
      ),
    }).subscribe(({ users, booking, resources }) => {
      this.users = users;
      this.booking = booking;
      this.resources = resources;
      this.editBookingForm.patchValue({
        user_id: booking.user_id.id.toString(),
        resource_id: booking.resource.id.toString(),
        startDate: booking.startDate.replace(/\/|:| /g, ''),
        endDate: booking.endDate.replace(/\/|:| /g, ''),
      });
    });
  }

  hasFieldError(field: string) {
    return (
      this.editBookingForm.get(field)?.invalid &&
      this.editBookingForm.get(field)?.touched
    );
  }

  onSubmit() {
    const form = this.editBookingForm.value;

    this.http
      .put(`${this.baseUrl}/reservas/${this.bookingId}`, {
        startDate: this.buildApiFormatDate(form.startDate),
        endDate: this.buildApiFormatDate(form.endDate),
        user_id: {
          id: form.user_id,
        },
        resource: {
          id: form.resource_id,
        },
      })
      .subscribe(() => {
        this.snackBar.open('Reserva atualizada com sucesso', 'Ok', {
          duration: 2000,
        });
        this.dialogRef.close(true);
      });
  }

  onDelete() {
    this.http
      .delete(`${this.baseUrl}/reservas/${this.bookingId}`)
      .subscribe(() => {
        this.snackBar.open('Reserva removida com sucesso', 'Ok', {
          duration: 2000,
        });
        this.dialogRef.close(true);
      });
  }

  onReport() {
    const dialogRef = this.dialog.open(ReportBookingModal, {
      width: '500px',
      data: this.booking,
    });
    dialogRef.afterClosed().subscribe((reported: boolean) => {
      if (reported) {
        this.dialogRef.close();
      }
    });
  }

  private buildApiFormatDate(date: string) {
    const day = date.slice(0, 2);
    const month = date.slice(2, 4);
    const year = date.slice(4, 8);
    const hour = date.slice(8, 10);
    const minute = date.slice(10, 12);

    return `${day}/${month}/${year} ${hour}:${minute}:00`;
  }
}
