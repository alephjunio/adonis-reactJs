'use strict'

const Model = use('Model')

class Property extends Model {




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
