import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/app/shared/models/Tag';
import { FoodService } from '../../services/food.service';

@Component({
  selector: 'tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  tags?: Tag[];
  constructor(
    private foodService: FoodService
  ) {
    this.foodService.getAllTags()
      .subscribe( tags => {
        this.tags = tags;
      });
  }

  ngOnInit(): void {
    
  }

}
