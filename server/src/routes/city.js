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

  router.use('*', (req, res) => {
    return res.status(404).json({
      success: false,
      message: 'That endpoint do not exist',
    });
  });
  
export default router;
