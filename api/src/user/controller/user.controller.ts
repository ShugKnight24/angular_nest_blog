import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards
} from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { catchError, Observable, of, map } from 'rxjs';
import { hasRoles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import {
  LoginError,
  LoginSuccess,
  User,
  UserRole
} from '../models/user.interface';
import { UserService } from '../service/user.service';

// controller name becomes the endpoint location
// current example: localhost:3000/users
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() user: User): Observable<User | LoginError> {
    return this.userService.create(user).pipe(
      map((user: User) => user),
      catchError((error) => of({ error: error.message }))
    );
  }

  @Post('login')
  login(@Body() user: User): Observable<LoginSuccess | string> {
    return this.userService.login(user).pipe(
      map((jwt: string) => {
        return { access_token: jwt };
      })
    );
  }

  @Get(':id')
  findOne(@Param() params): Observable<User> {
    return this.userService.findOne(params.id);
  }

  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = Number(process.env.USER_PAGINATION_LIMIT)
  ): Observable<Pagination<User>> {
    limit =
      limit > Number(process.env.USER_PAGINATION_LIMIT)
        ? Number(process.env.USER_PAGINATION_LIMIT)
        : limit;
    return this.userService.paginateUsers({
      page: Number(page),
      limit: Number(limit),
      // TOOD: // add ability for env to be imported in from config file
      route: 'http://localhost:3000/api/users'
    });
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string): Observable<any> {
    return this.userService.deleteOne(Number(id));
  }

  // TODO: // Ensure current user is the one updating...
  // Allow admins to update any user as well
  @Put(':id')
  updateOne(@Param('id') id: string, @Body() user: User): Observable<any> {
    return this.userService.updateOne(Number(id), user);
  }

  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id/role')
  updateUserRole(
    @Param('id')
    id: string,
    @Body() user: User
  ): Observable<User> {
    return this.userService.updateUserRole(Number(id), user);
  }
}
