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
import { AddResourceModalModule } from './components/add-resource-modal/add-resource-modal.module';
import { AddResourceModal } from './components/add-resource-modal/add-resource-modal';
import { EditResourceModalModule } from './components/edit-resource-modal/edit-resource-modal.module';
import { EditResourceModal } from './components/edit-resource-modal/edit-resource-modal';
import { ResourceModel } from './model/ResourceModel';
import { DeleteResourceModalModule } from './components/delete-resource-modal/delete-resource-modal.module';
import { DeleteResourceModal } from './components/delete-resource-modal/delete-resource-modal';

@Component({
  imports: [
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    AddResourceModalModule,
    EditResourceModalModule,
    DeleteResourceModalModule,
  ],
  standalone: true,
  templateUrl: './resources-page.component.html',
  styleUrl: './resources-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourcePage implements OnInit, AfterViewInit {
  private readonly baseUrl = process.env['NG_APP_API_URL'];
  displayedColumns: string[] = ['id', 'name', 'type', 'actions'];
  dataSource = new MatTableDataSource<ResourceModel>([]);
  readonly dialog = inject(MatDialog);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadResources();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openAddResource() {
    const dialogRef = this.dialog.open(AddResourceModal);
    dialogRef.afterClosed().subscribe((shouldRefresh: boolean) => {
      if (shouldRefresh) {
        this.loadResources();
      }
    });
  }

  openEditResource(id: number) {
    const dialogRef = this.dialog.open(EditResourceModal, { data: id });
    dialogRef.afterClosed().subscribe((shouldRefresh: boolean) => {
      if (shouldRefresh) {
        this.loadResources();
      }
    });
  }

  openDeleteResource(resource: ResourceModel) {
    const dialogRef = this.dialog.open(DeleteResourceModal, { data: resource });
    dialogRef.afterClosed().subscribe((shouldRefresh: boolean) => {
      if (shouldRefresh) {
        this.loadResources();
      }
    });
  }

  private loadResources() {
    this.http
      .get<ResourceModel[]>(`${this.baseUrl}/recursos`)
      .subscribe((data) => (this.dataSource.data = data));
  }
}
