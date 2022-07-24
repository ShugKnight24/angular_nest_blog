import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../auth-service/authentication.service';

interface PaginationObject {
  currentPage: number;
  itemCount: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
};

interface LinkObject {
  first: string;
  last: string;
  next: string;
  previous: string;
};


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

  getAllUsers(
    limit: number,
    page: number
  ): Observable<UsersResponse> {

    const jwtToken = localStorage.getItem('blog_jwt_token');
    if (!jwtToken) {
      throw new Error(`User does not have proper access privileges`);
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);
    const params = new HttpParams();
    params.append('limit', limit.toString());
    params.append('page', page.toString());

    const options = {
      headers,
      params
    };

    return this.http.get<UsersResponse>('/api/users', options).pipe(
      map((response: UsersResponse) => response),
      catchError(error => {
        throw new Error(`Error when getting all users: ${error}`);
      })
    );
  }
}
