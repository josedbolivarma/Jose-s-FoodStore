import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Food } from 'src/app/shared/models/Food';
import { FoodService } from '../../services/food.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  public foods!: Food[];

  constructor(
    private foodService: FoodService,
    activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe( ( params: any ) => {
      if ( params.searchTerm ) {
        this.foodService.getAllFoodsBySearchTerm( params.searchTerm )
          .subscribe( ( foods ) => {
            this.foods = foods;
          })
      } 
      else if ( params.tag ) {
        this.foodService.getAllFoodsByTag( params.tag )
          .subscribe( foods => {
            this.foods = foods;
          })
      }
      else {
        this.foodService.getAll()
          .subscribe( foods => {
            this.foods = foods;
          })
      }
    })
  }

  ngOnInit(): void {
  }

}
