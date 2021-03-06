'use strict'

const User = use('App/Models/User');

class UserController {

    async create({ request, response, auth}) {
        const user = await User.create(request.only(['username','email','password']));

        console.dir(auth);
        if(!auth)
            await auth.login(user);
        else
            console.log("si auth");
        //await auth.login(user);
        return response.redirect('/tvshow/crear');
    }

    async login({ request, auth, response, session }) {
        const { email, password } = request.all();

        try {
            await auth.attempt(email, password);
            return response.redirect('/');
        } catch (error) {
            console.dir(error)
            session.flash({loginError: 'Credenciales inválidas.'})
            return response.redirect('/login');
        }
    }


    show ({ auth, params }) {
        if (auth.user.id !== Number(params.id)) {
          return "You cannot see someone else's profile"
        }
        return auth.user
      }

    jobs() {
        return this.hasMany('App/Models/Job');
      }
}

module.exports = UserController
