import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {
  inject,
  OnInit,
  ViewChild,
  Component,
  AfterViewInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { AddUserModalModule } from './components/add-user-modal/add-user-modal.module';
import { AddUserModal } from './components/add-user-modal/add-user-modal';
import { EditUserModalModule } from './components/edit-user-modal/edit-user-modal.module';
import { EditUserModal } from './components/edit-user-modal/edit-user-modal';
import { UserModel } from './model/UserModel';
import { DeleteUserModalModule } from './components/delete-user-modal/delete-user-modal.module';
import { DeleteUserModal } from './components/delete-user-modal/delete-user-modal';

@Component({
  imports: [
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    AddUserModalModule,
    EditUserModalModule,
    DeleteUserModalModule,
  ],
  standalone: true,
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPage implements OnInit, AfterViewInit {
  private readonly baseUrl = process.env['NG_APP_API_URL'];
  displayedColumns: string[] = ['id', 'name', 'email', 'type', 'actions'];
  dataSource = new MatTableDataSource<UserModel>([]);
  readonly dialog = inject(MatDialog);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openAddUser() {
    const dialogRef = this.dialog.open(AddUserModal);
    dialogRef.afterClosed().subscribe((shouldRefresh: boolean) => {
      if (shouldRefresh) {
        this.loadUsers();
      }
    });
  }

  openEditUser(id: number) {
    const dialogRef = this.dialog.open(EditUserModal, { data: id });
    dialogRef.afterClosed().subscribe((shouldRefresh: boolean) => {
      if (shouldRefresh) {
        this.loadUsers();
      }
    });
  }

  openDeleteUser(user: UserModel) {
    const dialogRef = this.dialog.open(DeleteUserModal, { data: user });
    dialogRef.afterClosed().subscribe((shouldRefresh: boolean) => {
      if (shouldRefresh) {
        this.loadUsers();
      }
    });
  }

  private loadUsers() {
    this.http
      .get<UserModel[]>(`${this.baseUrl}/usuarios`)
      .subscribe((data) => (this.dataSource.data = data));
  }
}
