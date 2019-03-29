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

//Route.on('/').render('welcome')
Route.on('/').render('/tvshow/index')

Route.get('/tvshow', 'TvshowController.index');
//Route.get('', 'JobController.userIndex');

Route.get('/tvshow/crear', 'TvshowController.create');
Route.post('/tvshow/store', 'TvshowController.store');
Route.get('/tvshow/edit/:id', 'TvshowController.edit');
Route.post('/tvshow/update/:id', 'TvshowController.update').validator('CreateTvShow');
Route.get('/tvshow/delete/:id', 'TvshowController.delete');

//Autenticación:
/*
Route
  .post('login', 'UserController.login')
  .middleware('guest')

Route
  .get('users/:id', 'UserController.show')
  .middleware('auth')
*/
Route.on('/signup').render('auth.signup');
Route.post('/signup', 'UserController.create').validator('CreateUser');
Route.on('/login').render('auth.login');
Route.get('/logout', async ({ auth, response }) => {
    await auth.logout();
    return response.redirect('/');
});

Route.post('/login', 'UserController.login').validator('LoginUser');