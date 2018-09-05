'use strict'

// import model users;
const User = use("App/Models/User")

class UserController {

  // metodo create novo usuario.
  async create ({ request }) {
    // Buscamos os campos de username, email e password do corpo
    // da nossa requisição e os armazenamos em um objeto chamado data;
    const data = request.only(["username", "email", "password"])
    // Criamos um novo usuário repassando os parâmetros vindos da requisição
    // e salvamos esse novo usuário em uma variável user;
    const user = await User.create(data)
    // Retornamos o novo usuário como resultado da requisição, como selecionamos, no nosso caso o retorno será um JSON.
    return user
  }

}

module.exports = UserController
