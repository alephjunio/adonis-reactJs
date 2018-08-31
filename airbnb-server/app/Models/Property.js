'use strict'

const Model = use('Model')
const Database = use('Database') // Para manipulação de banco de dados no adonis

class Property extends Model {

  // metodo para contruir querys personalizadas.
  static scopeNearBy (query, latitude, longitude, distance) {
    const haversine = `(6371 * acos(cos(radians(${latitude}))
    * cos(radians(latitude))
    * cos(radians(longitude)
    - radians(${longitude}))
    + sin(radians(${latitude}))
    * sin(radians(latitude))))`

  return query
    .select('*', Database.raw(`${haversine} as distance`))
    .whereRaw(`${haversine} < ${distance}`)
  }


  // Relacionamento de varios imoveis para 1 usuario
  user () {
    return this.belongsTo('App/Models/User')
  }

  // Relacionamento de varias images para 1 imovel
  images () {
    return this.hasMany('App/Models/Image')
  }


}

module.exports = Property
