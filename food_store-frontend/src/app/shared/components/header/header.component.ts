import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CartService } from '../../../products/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cartQuantity = 0;
  user: string = 'Jose';

  constructor(
    cartService: CartService,
    private authService: AuthService
  ) {
    cartService.getCartObservable()
      .subscribe( newCart => {
        this.cartQuantity = newCart.totalCount;
      });

      authService.userObservable.subscribe( newUser => {
        console.log('User', newUser );
        this.user = newUser;
      });
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
  }

  get isAuth() {
    return this.user;
  }

}
