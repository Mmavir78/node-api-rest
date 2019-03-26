'use strict'

const Tvshow = use('App/Models/Tvshow')

class TvshowController {

    async index({view, response}) {

        //const tvshows = await Tvshow.all();
       
        let tvshows = await Tvshow.all();
        tvshows = tvshows.toJSON()
       
        return view.render('tvshow.index', {tvshows})
    }

    async create({ view }) {

        //const tvshow = request.all();
        //console.log(tvshow);
        //var hola  = 'hola'
        return view.render('tvshow.crear')
        /*
        const posted = await Tvshow.create({
            title: 'Crear', 
            titulo: tvshow.titulo,
            year: tvshow.year,
            pais: tvshow.pais,
            poster: tvshow.poster,
            temporada: tvshow.temporada
        });
       */
        //session.flash({ message: 'Your TV show has been posted!' });
        // return response.redirect('back');
    }

    async store({ request, response, session, auth}) {

        const tvshow = request.all();

        console.dir(tvshow);

        const posted = await Tvshow.create({
            titulo: tvshow.titulo,
            year: tvshow.year,
            pais: tvshow.pais,
            poster: tvshow.poster,
            temporadas: tvshow.temporada
        });
       
        session.flash({ message: 'Your tv show has been saved!' });
        return response.redirect('back');
    }

    async edit({ params, view }) {
        console.dir(params);
        const tvshow = await Tvshow.find(params.id);
        console.log("titulo "+tvshow.titulo)
        return view.render('tvshow.edit', { tv: tvshow });
    }

    async update ({ response, request, session, params }) {
        const tvshow = await Tvshow.find(params.id);

        tvshow.titulo = request.all().titulo;
        tvshow.year = request.all().year;
        tvshow.pais = request.all().pais;

        await tvshow.save();

        session.flash({ message: 'Your tvshow has been updated. '});
        return response.redirect('/');
    }

    async delete({ response, session, params}) {
        const job = await Tvshow.find(params.id);

        await Tvshow.delete();
        session.flash({ message: 'Your Tvshow has been removed'});
        return response.redirect('back');
    }

}

module.exports = TvshowController
