'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TvshowSchema extends Schema {
  up () {
    this.create('tvshows', (table) => {
      table.increments()
      table.string('titulo', 80).notNullable()
      table.integer('year')
      table.string('pais', 15)
      table.string('poster',100)
      table.integer('temporadas')
      table.enum('genero',['Drama', 'Fantasy', 'Sci-Fi', 'Thriller', 'Comedy'])
      table.string('summary', 100) 
      table.timestamps()
    })
  }

  down () {
    this.drop('tvshows')
  }
}

module.exports = TvshowSchema
