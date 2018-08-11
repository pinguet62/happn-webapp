import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {CurrentUserService} from './currentUser.service';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(
    private router: Router,
    private currentUserService: CurrentUserService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.currentUserService.isLogged()) {
      return true;
    }

    this.router.navigate([`/login`]);
    return false;
  }

}
