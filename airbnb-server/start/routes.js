'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')

Route.get('/', ({ request }) => {
  return { greeting: 'Hello world in JSON' }
})

Route.post('/users', 'UserController.create')

Route.post('/sessions', 'SessionController.create')

// Routes para properties
Route.resource('properties', 'PropertyController')
.apiOnly()
.middleware('auth')

// rota para cadastro fe imagens da propriedade.
Route.post('properties/:id/images', 'ImageController.store')
.middleware('auth')

// Rota para exibição da imagens
Route.get('images/:path', 'ImageController.show')
