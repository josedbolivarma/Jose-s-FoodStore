import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, Subject } from 'rxjs';
import { Food } from 'src/app/shared/models/Food';
import { FoodService } from '../../services/food.service';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {


  searchTerm = '';
  suggestTerm = '';
  
  showSuggest: boolean = false;

  debouncer: Subject<string> = new Subject();
  suggestFood: Food[] = [];

  constructor(
    activatedRoute: ActivatedRoute,
    private router: Router,
    private foodService: FoodService
  ) {
    activatedRoute.params.subscribe( ( params: any ) => {
      if ( params.searchTerm ) {
        // this.searchTerm = params.searchTerm;
        this.searchTerm = '';
        this.suggestTerm = '';
        this.suggestFood = [];
        this.showSuggest = false;
      }
    });
  }

  ngOnInit(): void {
    console.log( this.suggestFood );
    this.debouncer.pipe(
      debounceTime( 300 )
    )
    .subscribe( valor => {
      console.log({ valor });
    });
  }

  onKeyPress( value: string ) {
    this.showSuggest = true;
    this.suggestTerm = value;
    this.debouncer.next( value );
    this.foodService.getAllFoodsBySearchTerm( value )
      .subscribe({
        next: ( foods ) => this.suggestFood = foods,
        error: ( error ) => this.suggestFood = []
      });
    
    console.log( this.suggestFood );
  }

  search( term: string ): void {
    
    if ( term.length > 0 ) {
      this.router.navigateByUrl(`/search/${ term }`);
    } else {
      this.router.navigateByUrl(`/`);
    }
  }

}
