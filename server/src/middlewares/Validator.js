
export default class Validator {
  static validateStateCredential(req, res, next) {
    req.checkBody('name', 'Please provide the state name').notEmpty();

    if (req.validationErrors()) {
      return req.getValidationResult()
        .then(result => res.status(422).json({ message: 'Please check your credentials', errors: result.mapped() }));
    }

    return next();
  }

  static validateStateParams(req, res, next) {
    req.check('stateId', 'Please provide the state Id').notEmpty().isInt();

    if (req.validationErrors()) {
      return req.getValidationResult()
        .then(result => res.status(422).json({ message: 'Please check your credentials', errors: result.mapped() }));
    }

    return next();
  }

  static validateCityCredential(req, res, next) {
    req.checkBody('name', 'Please provide the City name').notEmpty();
    req.checkBody('totalMale', 'Please provide the total number of males ').notEmpty().isInt();
    req.checkBody('totalFemale', 'Please provide the total number of females').notEmpty().isInt();
    req.checkBody('stateId', 'Please provide the state Id name').notEmpty().isInt();

    if (req.validationErrors()) {
      return req.getValidationResult()
        .then(result => res.status(422).json({ message: 'Please check your credentials', errors: result.mapped() }));
    }

    return next();
  }

  static validateCityParams(req, res, next) {
    req.checkParams('cityId', 'Please provide the City Id').notEmpty().isInt();

    if (req.validationErrors()) {
      return req.getValidationResult()
        .then(result => res.status(422).json({ message: 'Please check your credentials', errors: result.mapped() }));
    }

    return next();
  }
}
