import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import {
  CalendarEvent,
  CalendarCommonModule,
  CalendarWeekModule,
  CalendarView,
} from 'angular-calendar';
import { Subject } from 'rxjs';
import { parse, setHours, startOfWeek, endOfWeek, format } from 'date-fns';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../security/auth.service';
import { AddBookingModalModule } from './components/add-booking-modal/add-booking-modal.module';
import { MatDialog } from '@angular/material/dialog';
import { AddBookingModal } from './components/add-booking-modal/add-booking-modal';
import { EditBookingModalModule } from './components/edit-booking-modal/edit-booking-modal.module';
import { EditBookingModal } from './components/edit-booking-modal/edit-booking-modal';

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
  user_id: User;
  resource: Resource;
}

@Component({
  standalone: true,
  imports: [
    MatButtonModule,
    MatButtonToggleModule,
    CalendarCommonModule,
    CalendarWeekModule,
    AddBookingModalModule,
    EditBookingModalModule,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePage implements OnInit {
  private readonly dateFormat = 'dd/MM/yyyy HH:mm:ss';
  private readonly baseUrl = process.env['NG_APP_API_URL'];

  readonly dialog = inject(MatDialog);

  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  refresh = new Subject<void>();
  view: CalendarView = CalendarView.Week;

  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService
  ) {}

  get isLogged() {
    return this.authService.isLogged();
  }

  ngOnInit(): void {
    this.loadApiData();
  }

  handleEvent(event: CalendarEvent) {
    if (!this.isLogged) {
      return;
    }

    const dialogRef = this.dialog.open(EditBookingModal, { data: event.id });
    dialogRef.afterClosed().subscribe((shouldRefresh: boolean) => {
      if (shouldRefresh) {
        this.loadApiData();
      }
    });
  }

  addBooking() {
    const dialogRef = this.dialog.open(AddBookingModal);
    dialogRef.afterClosed().subscribe((shouldRefresh: boolean) => {
      if (shouldRefresh) {
        this.loadApiData();
      }
    });
  }

  loadApiData() {
    const startOfWeekDate = startOfWeek(this.viewDate, { weekStartsOn: 1 });
    const endOfWeekDate = endOfWeek(this.viewDate, { weekStartsOn: 1 });

    const params = new HttpParams()
      .set('startDate', format(startOfWeekDate, 'dd/MM/yyyy HH:mm:ss'))
      .set('endDate', format(endOfWeekDate, 'dd/MM/yyyy HH:mm:ss'));

    this.http
      .get<Booking[]>(`${this.baseUrl}/reservas`, { params })
      .subscribe((bookings) => {
        this.events = bookings.map((booking) => ({
          id: booking.id,
          title: `Recurso: ${booking.resource.name}\nUsuário: ${booking.user_id.name}`,
          start: this.parseDate(booking.startDate),
          end: this.parseDate(booking.endDate),
        }));
        this.refresh.next();
      });
  }

  private parseDate(dateStr: string) {
    return parse(dateStr, this.dateFormat, new Date());
  }
}
