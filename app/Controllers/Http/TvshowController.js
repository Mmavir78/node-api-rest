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

        return view.render('tvshow.crear')
        
    }

    async store({ request, response, session}) {

        const tvshow = request.all();

        //const files = request.file('poster');

        //console.dir(files)
        //console.dir(tvshow);

        let EDFile = request.file('poster');
        //console.dir(EDFile);
       
        //console.log("name "+EDFile.clientName);
        //C:\Users\mporras\node-api-rest\public\
        //console.log(`${EDFile.clientName}`);
        //console.log(`../public/files/${EDFile.clientName}`);
        //Descomentar
        EDFile.move(`./public/files/${EDFile.clientName}`);
        /*, err => {
            
            if(err) {
                console.log("error");
                return res.status(500).send({ message : err })
            } else {
                res.redirect('/');
            }
        });
        */
       
        const posted = await Tvshow.create({
            titulo: tvshow.titulo,
            year: tvshow.year,
            pais: tvshow.pais,
            poster: `./public/files/${EDFile.clientName}`,
            temporadas: tvshow.temporada

        });
       
        session.flash({ message: 'Your tv show has been saved!' });
        return response.redirect('back');
        
    }

    async edit({ params, view }) {
        //console.dir(params);
        const tvshow = await Tvshow.find(params.id);
        //console.log("titulo "+tvshow.titulo)
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
