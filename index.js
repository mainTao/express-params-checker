const _ = require('lodash')

module.exports = (...requiredFields) => {
  const checkFunc = (req) => {
    let parameters = _.extend({}, req.query, req.body, req.params)
    for(let i = 0; i < requiredFields.length; i++){
      if(!_.has(parameters, requiredFields[i])){
        let err = new Error(`Missing parameter: ${requiredFields[i]}`)
        err.status = 400
        return err
      }
    }
    req.parameters = parameters
    req.data = parameters
  }

  return (req, res, next) => {
    let err = checkFunc(req)
    next(err)
  }
}
