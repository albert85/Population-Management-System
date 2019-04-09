import express from 'express';
import validator from 'middlewares/Validator';
import { cityController } from 'controllers';

const router = express.Router();

router.route('/pms/city')
  .post(validator.validateCityCredential, cityController.createCity)
  .get(cityController.getAllCities);

router.route('/pms/city/:cityId')
  .put(validator.validateCityParams, cityController.updateACity)
  .delete(validator.validateCityParams, cityController.deleteACity);

export default router;
