const _ = require('lodash')

function check(para, requiredFields) {
  const checkFunc = (req) => {
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

exports.has = (...requiredFields) => {
  let para = _.extend({}, req.query, req.body, req.params)
  check(para, requiredFields)
}

exports.QueryHas = (...requiredFields) => {
  let para = req.query
  check(para, requiredFields)
}

exports.BodyHas = (...requiredFields) => {
  let para = req.body
  check(para, requiredFields)
}

exports.ParamHas = (...requiredFields) => {
  let para = req.params
  check(para, requiredFields)
}
