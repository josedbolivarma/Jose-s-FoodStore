import { request, response } from 'express';
import { FoodModel } from '../models/food.model';
import { Response404 } from '../helpers/http_status_responses/404';
import { Response500 } from '../helpers/http_status_responses/500';
import { sample_foods, sample_tags } from '../data';

export const seedAllFoodsInDb = async ( req = request, res = response ) => {
    try {
        const foodsCount = await FoodModel.countDocuments();
        if ( foodsCount > 0 ) {
            res.json({
                ok: true,
                msg: 'Seed is already done!'
            })
            return;
        }

        await FoodModel.create( sample_foods );
        return res.json({
            ok: true,
            msg: 'Seed is done'
        });
        
    } catch (error) {
        return res.status( Response500 ).json({
            ok: false,
            msg: 'Error in db - contact the server'
        })
    }
}

export const getAll = async ( req = request, res = response ) => {
    try {
        const foods = await FoodModel.find();
        
        if ( !foods ) {
            return res.status( Response404 ).json({
                ok: false,
                msg: 'No food data in database'
            });
        }

        return res.json({
            ok: true,
            foods
        })

    } catch (error) {
        return res.status( Response500 ).json({
            ok: false,
            msg: 'Error in db - contact the server'
        });
    }
}

export const getFoodsBySearchTerm = async ( req = request, res = response ) => {
    try {
        const searchRegex = new RegExp( req.params.searchTerm, 'i');
        const foods = await FoodModel.find({ name: { $regex: searchRegex }});

        res.json({
            ok: true,
            foods
        });

    } catch (error) {
        return res.status( Response500 ).json({
            ok: false,
            msg: 'Error in db - contact the server'
        });
    }
}

export const getAllTags = async ( req = request, res = response ) => {
    try {

        const tagsImageUrl = sample_tags.map( tag => {
            return tag.imageUrl;
        });

        // console.log('TAGS ASOGMA,ER', tagsImageUrl );

        const tags = await FoodModel.aggregate([
            {
                $unwind: '$tags'
            },
            {
                $group: {
                    _id: '$tags',
                    count: { $sum: 1 },
                }
            },
            {
                $project: {
                    _id: 0,
                    name: '$_id',
                    count: '$count',
                    imageUrl: await tagsImageUrl[1]
                }
            }
        ]).sort({ count: -1 });

        const all = {
            name: 'All',
            count: await FoodModel.countDocuments(),
            // imageUrl: 'https://loveincstatic.blob.core.windows.net/loveexploring/lovefood-compressor.jpg'
        }

        tags.unshift( all );

        // Este es un ciclo anidado
        tags.forEach( ( tag ) => {
            sample_tags.forEach( ( item, i ) => {
                if ( tag.name === item.name ) {
                    tag.imageUrl = item.imageUrl; 
                }
            });
        });


        res.json({
            ok: true,
            tags
        });

    } catch (error) {
        return res.status( Response500 ).json({
            ok: false,
            msg: 'Error in db - contact the server'
        });
    }
};

export const getFoodsByTagName = async ( req = request, res = response ) => {
    const { tagName } = req.params;
    
    try {
        const foods = await FoodModel.find({ tags: tagName });
        res.json({
            ok: true,
            foods
        });
        
    } catch (error) {
        return res.status( Response500 ).json({
            ok: false,
            msg: 'Error in db - contact the server'
        });
    }    
};

export const getFoodById = async ( req = request, res = response ) => {
    const { foodId } = req.params;
    
    try {
        const food = await FoodModel.findById( foodId );
        res.json({
            ok: true,
            food
        })
    } catch (error) {
        return res.status( Response500 ).json({
            ok: false,
            msg: 'Error in db - contact the server'
        });
    }
};