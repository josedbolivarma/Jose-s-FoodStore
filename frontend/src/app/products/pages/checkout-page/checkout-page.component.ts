import { Component, OnInit } from '@angular/core';
import { Order } from '../../../shared/models/Order';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {
  order: Order = new Order();
  checkoutForm!: FormGroup;
  constructor(
    cartService: CartService,
    private fb: FormBuilder,
  ) {
    const cart = cartService.getCart();
    this.order.items = cart.items;
    this.order.totalPrice = cart.totalPrice;
  }

  ngOnInit(): void {
    console.log( this.order );
  }

  pay() {

  }

}
