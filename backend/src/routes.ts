import { Router } from 'express';
import OC from './controllers/OrphanagesController';

const routes = Router();

routes.post('/orphanages', OC.create);
routes.get('/orphanages', OC.index);
routes.get('/orphanages/:id', OC.show);

var x = async (request: any, response: any) => {
    return response.json({ message: 'Die'});
}
routes.get('/', x);

export default routes;