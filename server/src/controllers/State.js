import db from 'models';
import handleResponse from 'helpers/util';


export default class State {
  static createState(req, res) {
    const { name } = req.body;
    return db.State
      .findOrCreate({
        where: {
          name,
        },
      })
      .then(([state, created]) => (created ? handleResponse(res, 201, 'State successfully created', state, true)
        : handleResponse(res, 400, 'State details already exist', state, false)))
      // eslint-disable-next-line arrow-parens
      .catch((err) => {
        /* istanbul ignore next */
        handleResponse(res, 400, 'Error occur while creating', err, false)});
  }

  static getAllStates(req, res) {
    return db.State
      .findAll({
        include: [db.City],
      })
      .then(states => handleResponse(res, 200, 'States successfully retrieved', states, true))
      .catch((err) => {
        /* istanbul ignore next */
        return handleResponse(res, 400, 'Error occur while retrieving', err, false)});
  }

  static updateAState(req, res) {
    const { stateId } = req.params;
    const { name } = req.body;

    return db.State
      .findAll({
        where: {
          id: stateId,
        },
      })
      .then((state) => {
        if (state.length < 1) {
          return handleResponse(res, 404, 'State not found', state, false);
        }

        return db.State
          .update(
            { name: name || state[0].name },
            {
              returning: true,
              where: {
                id: stateId,
              },
            },
          ).then(updatedState => handleResponse(res, 200, 'State successfully updated', updatedState, true))
          .catch((err) => {
            /* istanbul ignore next */
            return handleResponse(res, 400, 'Error ocurred while updating state', err, false)});
      })
      .catch((err) => {
        /* istanbul ignore next */
        return handleResponse(res, 400, 'Error occurred while retrieving the state', err, false);
      });
  }

  static deleteAState(req, res) {
    const { stateId } = req.params;
    return db.State
      .findAll({
        where: {
          id: stateId,
        },
      })
      .then((state) => {
        if (state.length < 1) {
          return handleResponse(res, 404, 'State not found', state, false);
        }

        return db.State
          .destroy({
            where: {
              id: stateId,
            },
          })
          .then(() => handleResponse(res, 200, 'State successfully deleted', state, true))
          .catch((err) => {
            /* istanbul ignore next */
            return handleResponse(res, 'Error occurred while deleting', err, false);
          });
      })
      .catch((err) => {
        /* istanbul ignore next */
        return handleResponse(res, 400, 'Error occur while retrieving the state', err, false);
      });
  }
}
