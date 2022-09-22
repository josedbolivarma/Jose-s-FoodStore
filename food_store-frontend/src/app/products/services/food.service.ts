import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Food } from 'src/app/shared/models/Food';
import { Tag } from 'src/app/shared/models/Tag';
import { sample_foods, sample_tags } from '../../../data';
import { map, Observable } from 'rxjs';
import { FOODS_URL } from 'src/app/shared/constants/urls';
import { FOODS_BY_SEARCH_URL, FOODS_TAGS_URL, FOODS_BY_TAG_URL, FOODS_BY_ID_URL } from '../../shared/constants/urls';
import { FoodResponse, TagResponse } from '../../shared/interfaces/food-response.interface';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Food[]> {
    return this.http.get<FoodResponse>( FOODS_URL )
      .pipe(
        map( foods => foods.foods )
      )
  }

  getAllFoodsBySearchTerm( searchTerm: string ) {
    return this.http.get<FoodResponse>( FOODS_BY_SEARCH_URL + searchTerm )
    .pipe(
      map( foods => foods.foods )
    );
  };

  getAllTags(): Observable<Tag[]> {
    return this.http.get<TagResponse>( FOODS_TAGS_URL )
      .pipe(
        map( tags => tags.tags )
      );
  };
  
  getAllFoodsByTag( tag: string ): Observable<Food[]> {
    return tag === 'All' 
    ? this.getAll()
    : this.http.get<FoodResponse>( FOODS_BY_TAG_URL + tag )
      .pipe(
        map( foods => foods.foods )
      );
  };

  getFoodById( foodId: string ): Observable<Food> {
    return this.http.get<any>( FOODS_BY_ID_URL + foodId )
      .pipe(
        map(
          foods => foods.food
        )
      )
  }
  
}
