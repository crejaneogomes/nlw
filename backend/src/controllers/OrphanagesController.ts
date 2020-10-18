import { NextFunction, Request, Response } from 'express'
import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage'
import OrphanageView from '../views/orphanages_view';
import * as Yup from 'yup';
import errorHandler from '../errors/handler';

export default {
    async index(request: Request, response: Response) {
        const orphanagesRepository = getRepository(Orphanage);
        
        const orphanages = await orphanagesRepository.find({
            relations: ['images']
        });

        return response.status(200).json(OrphanageView.renderMany(orphanages));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;
        const orphanagesRepository = getRepository(Orphanage);
        
        const orphanage = await orphanagesRepository.findOneOrFail(id, {
            relations: ['images']
        });

        return response.status(200).json(OrphanageView.render(orphanage));
    },

    async create(request: Request, response: Response, next: NextFunction) {
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        } = request.body;
    
        const requestImages = request.files as Express.Multer.File[];
        const images = requestImages.map( image => {
            return { path: image.filename };
        })

        const orphanagesRepository = getRepository(Orphanage);
        
        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            images
        }

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(Yup.object().shape({
                path: Yup.string().required()
            }))
        })

        try {
            await schema.validate(data, {
                abortEarly: false
            })

        } catch (exception) {
            errorHandler(exception, request, response, next);
            //next(exception);
        }

        const orphanage = orphanagesRepository.create(data);
    
        await orphanagesRepository.save(orphanage);
    
        return response.status(201).json(orphanage)
    }
}
