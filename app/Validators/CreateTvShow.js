'use strict'

class CreateTvShow {
  get rules () {
    return {
      // validation rules
      
      'titulo': 'required',
      'year': 'required',
      'pais': 'required'
      
    }
  }

  get messages() {
    return {
      'required': 'Woah now, {{ field }} is required.',
      'unique': 'Wait a second, the {{ field }} already exists'
    }
  }

  async fails(error) {
    this.ctx.session.withErrors(error)
      .flashAll();
    
    return this.ctx.response.redirect('back');
  }


}

module.exports = CreateTvShow
