import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {
  UsersResponse,
  UserService
} from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  usersData!: UsersResponse;
  pageEvent!: PageEvent;
  columsToDisplay: string[] = ['id', 'name', 'username', 'email', 'role'];

  constructor(
    private usersService: UserService
  ) { }

  ngOnInit(): void {
    this.initDataSource();
  }

  initDataSource() {
    this.usersService.getAllUsers(
      1,
      Number(environment.USER_PAGINATION_LIMIT)
    ).pipe(
      map((usersData: UsersResponse) => this.usersData = usersData)
    ).subscribe();
  }

  onPageChange(pageEvent: PageEvent) {
    this.usersService.getAllUsers(
      pageEvent.pageIndex + 1,
      pageEvent.pageSize
    ).pipe(
      map((usersData: UsersResponse) => this.usersData = usersData)
    ).subscribe();
  }
}
