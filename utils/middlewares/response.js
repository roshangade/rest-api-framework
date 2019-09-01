'use strict'
/*!
 * rest-api-framework
 * Copyright(c) 2018-2019 Roshan Gade
 * MIT Licensed
 */

/*
 * Response Handlers
 */
const response = (req, res) => {
  const send = res.end

  // set status code
  res.status = (code) => {
    res.statusCode = code
    return res
  }

  // parse response
  // TODO: data streaming
  res.json = res.send = (data) => {
    if (typeof data === 'object') {
      res.setHeader('Content-Type', 'application/json')
      data = JSON.stringify(data)
    }
    send.call(res, data)
  }
}

module.exports = response
