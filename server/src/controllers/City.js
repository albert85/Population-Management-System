import db from 'models';
import handleResponse from 'helpers/util';


export default class City {
  static createCity(req, res) {
    const {
      name, totalMale, totalFemale, stateId,
    } = req.body;

    return db.City
      .findOrCreate({
        where: {
          name,
        },
        defaults: {
          males: totalMale,
          females: totalFemale,
          stateId,
        },
      })
      .then(([city, created]) => (created ? handleResponse(res, 201, 'City successfully created', city, true)
        : handleResponse(res, 400, 'City details already exist', city, false)))
      .catch((err) => {
        /* istanbul ignore next */
        return handleResponse(res, 400, 'Error occur while creating city', err, false)
      });
  }

  static getAllCities(req, res) {
    return db.City
      .findAll({
        include: [db.State],
      })
      .then(city => handleResponse(res, 200, 'Cities successfully retrieved', city, true))
      .catch((err) => {
        /* istanbul ignore next */
        return handleResponse(res, 400, 'Error occur while retrieving cities', err, false)
      });
  }

  static updateACity(req, res) {
    const { cityId } = req.params;
    const {
      name, totalMale, totalFemale, stateId,
    } = req.body;

    return db.City
      .findAll({
        where: {
          id: cityId,
        },
      })
      .then((city) => {
        if (city.length < 1) {
          return handleResponse(res, 404, 'City not found', city, false);
        }

        const numOfMale = totalMale || city[0].males
        const numOfFemale = totalFemale || city[0].females;
        const total = numOfMale + numOfFemale;

        return db.City
          .update(
            {
              name: name || city[0].name,
              males: totalMale || city[0].males,
              females: totalFemale || city[0].females,
              stateId: stateId || city[0].stateId,
              total,
            },
            {
              returning: true,
              where: {
                id: cityId,
              },
            },
          ).then(updatedCity => handleResponse(res, 200, 'City successfully updated', updatedCity, true))
          .catch((err) => {
            /* istanbul ignore next */
            return handleResponse(res, 400, 'Error ocurred while updating city', err, false)
          });
      })
      .catch((err) => {
        /* istanbul ignore next */
        return handleResponse(res, 400, 'Error occurred while retrieving the city', err, false)
      });
  }

  static deleteACity(req, res) {
    const { cityId } = req.params;

    return db.City
      .findAll({
        where: {
          id: cityId,
        },
      })
      .then((city) => {
        if (city.length < 1) {
          return handleResponse(res, 404, 'City not found', city, false);
        }

        return db.City
          .destroy({
            where: {
              id: cityId,
            },
          })
          .then(() => handleResponse(res, 200, 'City successfully deleted', city, true))
          .catch((err) => {
            /* istanbul ignore next */
            return handleResponse(res, 'Error occurred while deleting city', err, false)
          });
      })
      .catch((err) => {
        /* istanbul ignore next */
        return handleResponse(res, 400, 'Error occur while retrieving the city', err, false)
      });
  }
}
