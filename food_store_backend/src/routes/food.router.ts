import { Router } from 'express';
import { getAll, getAllTags, getFoodsBySearchTerm, getFoodsByTagName, getFoodById, seedAllFoodsInDb } from '../controllers/food.controller';

const router = Router();

router.get('/seed', seedAllFoodsInDb );

router.get('/', getAll );

router.get('/search/:searchTerm', getFoodsBySearchTerm );

router.get('/tags', getAllTags );

router.get('/tag/:tagName', getFoodsByTagName );

router.get('/:foodId', getFoodById );

export default router;