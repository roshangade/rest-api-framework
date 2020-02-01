'use strict'
/*!
 * rest-api-framework
 * Copyright(c) 2018-2020 Roshan Gade
 * MIT Licensed
 */
const url = require('./../url')

/*
 * Parse URL and Query
 */
const request = (req, res) => {
  req._url = url.parseUrl(req.url)
  req.query = url.parseQuery(String(req._url.query))
  req.params = {}

  // Data Carrier
  req._ctx_data = {}
  req.set = (key, value) => {
    req._ctx_data[key] = value
  }
  req.get = (key) => req._ctx_data[key]
}

module.exports = request
