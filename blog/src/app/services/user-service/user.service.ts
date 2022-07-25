import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../auth-service/authentication.service';

interface LinkObject {
  first: string;
  last: string;
  next: string;
  previous: string;
};

interface PaginationObject {
  currentPage: number;
  itemCount: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
};

interface RequestOptions {
  headers: HttpHeaders;
  params: HttpParams;
}

export interface UsersResponse {
  items: User[];
  meta: PaginationObject;
  links: LinkObject;
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  createRequestOptions(
    limit: number,
    page: number,
    token: string,
    username?: string
  ): RequestOptions {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = new HttpParams();
    params.append('limit', limit.toString());
    params.append('page', page.toString());

    if (username) {
      params.append('username', username);
    }

    const options = {
      headers,
      params
    };

    return options;
  }

  getAllUsers(
    limit: number,
    page: number
  ): Observable<UsersResponse> {
    const jwtToken = this.getUserToken();
    if (!jwtToken) {
      throw new Error(`No User token found. User doesn't have proper access privileges`);
    }

    const options = this.createRequestOptions(limit, page, jwtToken);

    return this.http.get<UsersResponse>('/api/users', options).pipe(
      map((response: UsersResponse) => response),
      catchError(error => {
        throw new Error(`Error when getting all users: ${error}`);
      })
    );
  }

  getUserToken(): null | string {
    const jwtToken = localStorage.getItem('blog_jwt_token');
    if (!jwtToken) {
      return null;
    }
    return jwtToken;
  }

  searchByUsername(
    limit: number,
    page: number,
    username: string
  ): Observable<UsersResponse> {
    const jwtToken = this.getUserToken();
    if (!jwtToken) {
      throw new Error(`No User token found. User doesn't have proper access privileges`);
    }

    const options = this.createRequestOptions(limit, page, jwtToken, username);

    return this.http.get<UsersResponse>('/api/users', options).pipe(
      map((response: UsersResponse) => response),
      catchError(error => {
        throw new Error(`Error when getting all users: ${error}`);
      })
    );
  }
}
