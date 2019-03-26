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
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')

Route.get('/tvshow', 'TvshowController.index');
//Route.get('', 'JobController.userIndex');

Route.get('/tvshow/crear', 'TvshowController.create').validator('CreateTvShow');
Route.post('/tvshow/store', 'TvshowController.store');
Route.get('/tvshow/edit/:id', 'TvshowController.edit');
Route.post('/tvshow/update/:id', 'TvshowController.update').validator('CreateTvShow');
Route.get('/tvshow/delete/:id', 'TvshowController.delete');