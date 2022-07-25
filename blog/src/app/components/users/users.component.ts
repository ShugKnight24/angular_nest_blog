import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  columnsToDisplay: string[] = ['id', 'name', 'username', 'email', 'role'];
  pageEvent!: PageEvent;
  usersData!: UsersResponse;
  usernameSearchForm!: FormGroup;
  usernameToSearch!: string;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UserService
  ) { }

  ngOnInit(): void {
    this.initDataSource();
    this.usernameSearchForm = this.formBuilder.group({
      usernameToSearch: [null, [Validators.required]]
    });
  }

  initDataSource() {
    this.usersService.getAllUsers(
      1,
      Number(environment.USER_PAGINATION_LIMIT)
    ).pipe(
      map((usersData: UsersResponse) => this.usersData = usersData)
    ).subscribe();
  }

  findByUsername(username: string) {
    this.usersService.searchByUsername(
      0,
      Number(environment.USER_PAGINATION_LIMIT),
      username
    ).pipe(
      map((usersData: UsersResponse) => this.usersData = usersData)
    ).subscribe();
  }

  onPageChange(pageEvent: PageEvent) {
    if (this.usernameToSearch === null) {
      this.usersService.getAllUsers(
        pageEvent.pageIndex + 1,
        pageEvent.pageSize
      ).pipe(
        map((usersData: UsersResponse) => this.usersData = usersData)
      ).subscribe();
    } else {
      this.usersService.searchByUsername(
        0,
        Number(environment.USER_PAGINATION_LIMIT),
        this.usernameToSearch
      ).pipe(
        map((usersData: UsersResponse) => this.usersData = usersData)
      ).subscribe();
    }
  }
}
