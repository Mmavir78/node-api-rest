'use strict'

const Tvshow = use('App/Models/Tvshow')

class TvshowController {

    async index({view, response}) {

        const tvshow = await Tvshow.all();
        //console.dir(tvshow);
        return view.render('tvshow.index')
    }

    async create({ request, response, session}) {

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

    /*
    async create({ request, response, session, auth}) {
        const job = request.all();

        console.log(auth.user.id);
        
        const posted = await Job.create({
            title: job.title,
            link: job.link,
            description: job.description,
            user_id: auth.user.id
        });
       
        session.flash({ message: 'Your job has been posted!' });
        return response.redirect('back');
    }
    */

}

module.exports = TvshowController
