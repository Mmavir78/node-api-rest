'use strict'

const Tvshow = use('App/Models/Tvshow');
const CloudinaryService = use('App/Services/CloudinaryService');

const Drive = use('Drive');

class TvshowController {

    async index({view, response}) {

        //const tvshows = await Tvshow.all();
        
        //const Env = use('Env');
        //const amb = Env.get('APP_URL');
        let tvshows = await Tvshow.all();
        //console.dir(tvshows);
        //await Drive.get('relative-path-to-file')
        //tvshows.archivo = await Drive.get(tvshows.poster);
        tvshows = tvshows.toJSON();
       
        return view.render('tvshow.index', {tvshows})
    }

    async create({ view }) {

        return view.render('tvshow.crear')
        
    }

/*    
    async store({ request, response, session}) {

        const tvshow = request.all();
        let EDFile = request.file('poster');
       
        EDFile.move(`./public/files/${EDFile.clientName}`);
       //const unicorn = await Drive.get('unicorn.jpg')
        const posted = await Tvshow.create({
            titulo: tvshow.titulo,
            year: tvshow.year,
            pais: tvshow.pais,
            poster: './public/files/${EDFile.clientName}',
            temporadas: tvshow.temporada

        });
       
        session.flash({ message: 'Your tv show has been saved!' });
        return response.redirect('back');
        
    }
  */  
    async store( {request, response, session}) {
        const tvshow = request.all();
        const file = request.file('poster');
        try {
            const cloudinaryResponse = await CloudinaryService.v2.uploader.upload(file.tmpPath, {folder: 'postsapp'});
            console.dir(cloudinaryResponse);
            let post = new Tvshow();
            post.titulo = tvshow.titulo;
            post.year = tvshow.year;
            post.pais = tvshow.pais;
            post.poster = cloudinaryResponse.secure_url;
            await post.save();
            session.flash({success: 'Successfully added post'});
            return response.redirect('back');
        } catch (e) {
            //console.dir(e);
            session.flash({error: 'Error Uploading Image'});
            //console.log('Error Uploading Image');
            return response.redirect('back')
        }
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
