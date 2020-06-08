import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../model/user';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[];

  dataSource = new MatTableDataSource<User>(this.users);
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  displayedColumns: string[] = [
    'id',
    'username',
    'nom',
    'prenom',
    'email',
    'cin',
    'adresse',
    'telephone',
    'role',
    'actions',
  ];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private userService: UserService, private route: Router) {}

  deleteAgent(id: number) {
    this.userService.delete(id).subscribe(
      (data) => {
        console.log(data);

        this.userService.findAll().subscribe(
          (data) => {
            this.users = data;
            this.dataSource = new MatTableDataSource<User>(this.users);
            this.dataSource.paginator = this.paginator;
          },
          (error) => {
            this.dataSource = new MatTableDataSource<User>(null);
          }
        );
      },
      (error) => console.log(error)
    );
  }

  ngOnInit(): void {
    this.userService.findAll().subscribe(
      (data) => {
        this.users = data;
        this.dataSource = new MatTableDataSource<User>(this.users);
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        this.dataSource = new MatTableDataSource<User>(null);
      }
    );
  }
  goToUserItem(code: string) {
    this.route.navigate(['/user/' + code]);
  }
}
