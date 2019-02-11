const proxy = require('http-proxy-middleware');

module.exports = function(app) {
//   app.use(proxy('/auth/github', { target: 'http://localhost:3000/' }))
  app.use(proxy('/api/users/auth/github', { target: 'http://localhost:5000/' }))
  app.use(proxy('/api/users/', { target: 'http://localhost:5000/' }))
  app.use(proxy('/api/posts/', { target: 'http://localhost:5000/' }))
}
