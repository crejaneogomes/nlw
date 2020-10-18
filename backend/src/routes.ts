import { Router } from 'express';
import multer from 'multer';
import OC from './controllers/OrphanagesController';
import uploadConfig from '../src/config/upload';

const routes = Router();
const upload = multer(uploadConfig);

routes.post('/orphanages', upload.array('images') ,OC.create);
routes.get('/orphanages', OC.index);
routes.get('/orphanages/:id', OC.show);

var x = async (request: any, response: any) => {
    return response.json({ message: 'Die'});
}
routes.get('/', x);

export default routes;