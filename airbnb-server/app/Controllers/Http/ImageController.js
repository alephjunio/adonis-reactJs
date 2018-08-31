'use strict'


const Helpers = use('Helpers')


class ImageController {

  /**
  * Create/save a new image.
  * POST images
  */
  async store ({ params, request }) {
    // buscando imovel
    const property = await Property.findOrFail(params.id)
    // Recuperando imagem enviada por post
    const images = request.file('image', {
      types: ['image'],
      size: '2mb'
    })
    // movendo arquivo para pasta uploads
    await images.moveAll(Helpers.tmpPath('uploads'), file => ({
      name: `${Date.now()}-${file.clientName}`
    }))
    // caso não seja enviada retornar error
    if (!images.movedAll()) {
      return images.errors()
    }

    // Agora que já temos os arquivos vamos criar os registros de imagens no
    // banco de dados associados com o imóvel:
    await Promise.all(
      images
      .movedList()
      .map(image => property.images().create({ path: image.fileName }))
    )

  }

  /**
  * show/:path a show image.
  * GET image
  */
  async show ({ params, response }) {
    return response.download(Helpers.tmpPath(`uploads/${params.path}`))
  }


}

module.exports = ImageController
