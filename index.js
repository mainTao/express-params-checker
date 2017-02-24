const _ = require('lodash')

exports.has = (...requiredFields) => {
  const checkFunc = (req) => {
    let para = _.extend({}, req.query, req.body, req.params)
    for(let i = 0; i < requiredFields.length; i++){
      if(!_.has(para, requiredFields[i])){
        let err = new Error(`Missing parameter: ${requiredFields[i]}`)
        err.status = 400
        return err
      }
    }
    req.para = para
  }

  return (req, res, next) => {
    let err = checkFunc(req)
    next(err)
  }
}
