import { Component, OnInit } from '@angular/core';
import { FoodService } from '../../services/food.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Food } from 'src/app/shared/models/Food';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css']
})
export class DetailPageComponent implements OnInit {

  food!: Food;

  constructor(
    activatedRoute: ActivatedRoute,
    private foodService: FoodService,
    private cartService: CartService,
    private router: Router
  ) {
    activatedRoute.params.subscribe( ( params: any ) => {
      if ( params.id ) {
      this.foodService.getFoodById( params.id )
        .subscribe( food => {
          this.food = food;
        });
      }
    })
  }

  ngOnInit(): void {
  }

  addToCart() {
    this.cartService.addToCart( this.food );    
    this.router.navigateByUrl('/cart-page');
  }
}
