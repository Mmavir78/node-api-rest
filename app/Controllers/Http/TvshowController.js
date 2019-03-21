'use strict'

const Tvshow = use('App/Models/Tvshow')

class TvshowController {

    async index({view, response}) {

        const tvshow = await Tvshow.all();
        //console.dir(tvshow);
        return view.render('tvshow.index')
    }

    async create({ request, response}) {
        const tvshow = request.all();

        const posted = await Tvshow.create({
            titulo: tvshow.titulo,
            year: tvshow.year,
            pais: tvshow.pais,
            poster: tvshow.poster,
            temporada: tvshow.temporada
        });
       
        session.flash({ message: 'Your TV show has been posted!' });
        return response.redirect('back');
    }

}

module.exports = TvshowController
