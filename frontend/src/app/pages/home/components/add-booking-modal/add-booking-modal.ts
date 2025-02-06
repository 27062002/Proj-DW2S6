import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

interface User {
  id: number;
  name: string;
}

interface Resource {
  id: number;
  name: string;
}

@Component({
  selector: 'add-booking-modal',
  styleUrl: './add-booking-modal.scss',
  templateUrl: './add-booking-modal.html',
})
export class AddBookingModal implements OnInit {
  private readonly snackBar = inject(MatSnackBar);
  private readonly baseUrl = process.env['NG_APP_API_URL'];

  users: User[] = [];
  resources: Resource[] = [];
  addBookingForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dialogRef: MatDialogRef<AddBookingModal>
  ) {}

  ngOnInit(): void {
    this.addBookingForm = this.fb.group({
      startDate: [new Date(), [Validators.required]],
      endDate: [new Date(), [Validators.required]],
      user_id: ['', [Validators.required]],
      resource_id: ['', [Validators.required]],
    });
    this.http
      .get<User[]>(`${this.baseUrl}/usuarios`)
      .subscribe((users) => (this.users = users));
    this.http
      .get<Resource[]>(`${this.baseUrl}/recursos`)
      .subscribe((resources) => (this.resources = resources));
  }

  hasFieldError(field: string) {
    return (
      this.addBookingForm.get(field)?.invalid &&
      this.addBookingForm.get(field)?.touched
    );
  }

  onSubmit() {
    const form = this.addBookingForm.value;

    this.http
      .post(`${this.baseUrl}/reservas`, {
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
        this.snackBar.open('Reserva realizada com sucesso', 'Ok', {
          duration: 1000,
        });
        this.dialogRef.close(true);
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
