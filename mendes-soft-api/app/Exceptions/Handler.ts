/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import Logger from "@ioc:Adonis/Core/Logger";
import HttpExceptionHandler from "@ioc:Adonis/Core/HttpExceptionHandler";

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger);
  }

  public async handle(error, ctx) {
    console.log("error", error);

    //Se faltar alguma coluna no ato de registro 23502
    if (String(error.code) === "23502") {
      return ctx.response.status(400).send({
        title: "Faltou dado pra registo",
        message: `Informe o ${error.column} para criação de ${error.table}`,
      });
    }

    //Se algum campo unique houver duplicidade 23505
    if (String(error.code) === "23505") {
      const detail = error.detail.match(/\(([^()]+)\)/g);
      const column = detail[0];
      const value = detail[1];
      return ctx.response.status(400).send({
        title: "Duplicado",
        message: `Já existe um registro ${column} com o valor ${value}`,
      });
    }

    //Dado com tipo inválido
    if (String(error.code) === "22P02") {
      return ctx.response.status(400).send({
        title: "Campo inválido",
        message: `O tipo de dado informado é inválido: ${error.message
          .substring(error.message.indexOf("type"))
          .slice(5)}`,
      });
    }

    //Dado com muito grande
    if (String(error.code) === "22001") {
      return ctx.response.status(400).send({
        title: "Muitos caracteres",
        message: `O tipo de dado informado contém mais dados do que o permitido ${error.message.substring(
          error.message.indexOf("(")
        )}`,
      });
    }
    //Já possui algum vinculo
    if (String(error.code) === "23503") {
      return ctx.response.status(400).send({
        message: `Já possui um vinculo com ${error.table}, não pode apagar`,
      });
    }

    return super.handle(error, ctx);
  }
}
