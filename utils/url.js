'use strict'
/*!
 * rest-api-framework
 * Copyright(c) 2018-2020 Roshan Gade
 * MIT Licensed
 */
const url = require('url')
const query = require('querystring')

/*
 * URL utilities
 */
const Url = function() {
  return Object.freeze({
    /*
     * Parse URL and returns object
     */
    parseUrl(...args) {
      return url.parse.apply(null, args)
    },

    /*
     * Parse querystring into object
     */
    parseQuery(...args) {
      return query.parse.apply(null, args)
    },

    /*
     * Parse URL and get request params
     */
    parseParams(path, keys, pattern) {
      const params = {}
      const matches = pattern.exec(path)
      matches.shift()
      keys.forEach((key, i) => {
        if (matches[i]) params[key] = matches[i] || ''
      })
      return params
    },

    /*
     * Compile router URL and create RegExp for easy use
     */
    compile: function(route) {
      const keys = []
      let pattern = ''
      const sep = '/'

      route.split(sep).filter((val) => !!val).forEach((val) => {
        switch (val.charCodeAt(0)) {
          case 42: {
            pattern += '(.*)'
            break
          }
          case 58: {
            const length = val.length - 1
            const optional = val.charCodeAt(length) === 63
            keys.push(val.substring(1, optional ? length : undefined))
            pattern += optional ? '(?:/([^/]+?))?' : sep + '([^/]+?)'
            break
          }
          default: {
            pattern += sep + val
          }
        }
      })

      pattern = new RegExp(`^${pattern}/?$`, 'i')
      const data = {pattern};
      (!!keys.length) && (data.keys = keys)
      return data
    },
  })
}

module.exports = Url()
