import { Food } from '../models/Food';
import { Tag } from '../models/Tag';

export interface FoodResponse {
    ok: boolean;
    foods: Food[];
}

export interface TagResponse {
    ok: boolean;
    tags: Tag[];
}