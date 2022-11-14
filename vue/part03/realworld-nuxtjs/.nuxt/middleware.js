const middleware = {}

middleware['authenticated'] = require('..\\middleware\\authenticated.js')
middleware['authenticated'] = middleware['authenticated'].default || middleware['authenticated']

middleware['noAuthenticated'] = require('..\\middleware\\noAuthenticated.js')
middleware['noAuthenticated'] = middleware['noAuthenticated'].default || middleware['noAuthenticated']

export default middleware
