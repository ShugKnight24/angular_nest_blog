import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, from, map, Observable, switchMap } from 'rxjs';
import { AuthService } from 'src/auth/services/auth.service';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { User, UserRole } from '../models/user.interface';
import {
  paginate,
  Pagination,
  IPaginationOptions
} from 'nestjs-typeorm-paginate';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private authService: AuthService
  ) {}

  create(user: User): Observable<User> {
    return this.authService.hashPassword(user.password).pipe(
      switchMap((passwordHash: string) => {
        const newUser = new UserEntity();
        newUser.email = user.email;
        newUser.name = user.name;
        newUser.password = passwordHash;
        newUser.username = user.username;
        newUser.id = user.id;
        // set users role to `user` by default
        newUser.role = UserRole.USER;

        return from(this.userRepository.save(newUser)).pipe(
          map((user: User) => {
            const { password, ...result } = user;
            return result;
          }),
          catchError((error) => {
            throw new Error(error);
          })
        );
      })
    );
  }

  findOne(id: number): Observable<User> {
    return from(
      this.userRepository.findOne({
        where: {
          id: id
        }
      })
    ).pipe(
      map((user: User) => {
        const { password, ...result } = user;
        return result;
      })
    );
  }

  findAll(): Observable<User[]> {
    return from(this.userRepository.find()).pipe(
      map((users) => {
        users.forEach((user: User) => {
          delete user.password;
        });
        return users;
      })
    );
  }

  paginateUsers(options: IPaginationOptions): Observable<Pagination<User>> {
    return from(paginate<User>(this.userRepository, options)).pipe(
      map((usersPagination: Pagination<User>) => {
        usersPagination.items.forEach((user: User) => {
          delete user.password;
        });
        return usersPagination;
      })
    );
  }

  deleteOne(id: number): Observable<any> {
    return from(this.userRepository.delete(id));
  }

  updateOne(id: number, user: User): Observable<any> {
    delete user.email;
    delete user.password;
    delete user.role;

    return from(this.userRepository.update(id, user));
  }

  updateUserRole(id: number, user: User): Observable<any> {
    return from(this.userRepository.update(id, user));
  }

  login(user: User): Observable<string> {
    return this.validateUser(user.email, user.password).pipe(
      switchMap((user: User) => {
        if (user) {
          return this.authService
            .generateJWT(user)
            .pipe(map((jwt: string) => jwt));
        } else {
          return 'Wrong user credentials';
        }
      })
    );
  }

  validateUser(email: string, password: string): Observable<User> {
    return this.findByEmail(email).pipe(
      switchMap((user: User) =>
        this.authService.comparePasswords(password, user.password).pipe(
          map((match: boolean) => {
            if (match) {
              const { password, ...result } = user;
              return result;
            } else {
              throw Error;
            }
          })
        )
      )
    );
  }

  findByEmail(email: string): Observable<User> {
    return from(
      this.userRepository.findOne({
        where: {
          email: email
        }
      })
    );
  }
}
