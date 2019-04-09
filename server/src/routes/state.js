import express from 'express';
import validator from 'middlewares/Validator';
import { stateController } from 'controllers';

const router = express.Router();

router.route('/pms/state')
  .post(validator.validateStateCredential, stateController.createState)
  .get(stateController.getAllStates);

router.route('/pms/state/:stateId')
  .put(validator.validateStateParams, stateController.updateAState)
  .delete(validator.validateStateParams, stateController.deleteAState);

export default router;
