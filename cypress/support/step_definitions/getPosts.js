import { faker } from "@faker-js/faker";

const { buscaMassa } = require("../commons/geral.commons");

let result;
let payload;

Given(
  /^quando informar os dados para montar o payload com o get_posts, "([^"]*)"$/,
  (methods) => {
    result = cy.apiPostsGet(methods).then((response) => (result = response));
  }
);

Then(
  /^validar o retorno da get_posts com o "([^"]*)" e seu contrato$/,
  (statusCode) => {
    cy.wrap(result).then((response) => {
      // Verificar se o retorno do status é OK = 200
      expect(String(response.status)).to.eq(buscaMassa(statusCode));

      // Verificar se as chaves estão presentes
      expect(response.body[0]).to.have.all.keys(
        "userId",
        "id",
        "title",
        "body"
      );

      // Verificar os tipos dos valores são number ou string
      expect(response.body[0].userId).to.be.a("number");
      expect(response.body[0].id).to.be.a("number");
      expect(response.body[0].title).to.be.a("string");
      expect(response.body[0].body).to.be.a("string");
    });
  }
);

Given(/^efetuar a busca de um novo posts por id, "([^"]*)"$/, (methods) => {
  payload = JSON.stringify({
    title: "Teste prova js cypress",
    body: `${faker.internet.userName()} - ${faker.internet.email()}`,
    userId: 1000,
  });

  result = cy
    .apiPostsPost(methods, payload)
    .then((response) => (result = response));
});

Then(
  /^validar a busca de um posts por id com sucesso "([^"]*)"$/,
  (statusCode) => {
    cy.wrap(result).then((responsePost) => {
      // Verificar se o retorno do status é OK = 200
      expect(String(responsePost.status)).to.eq(
        buscaMassa("status_code created")
      );

      result = cy.apiPostsGet("GET", responsePost.body.id).then((response) => {
        // Verificar se o retorno do status é OK = 200
        expect(String(response.status)).to.eq(buscaMassa(statusCode));

        // Verificar se as chaves estão presentes
        expect(response.body[0]).to.have.all.keys(
          "userId",
          "id",
          "title",
          "body"
        );

        // Verificar os tipos dos valores são number ou string
        expect(response.body[0].userId).to.be.a("number");
        expect(response.body[0].id).to.be.a("number");
        expect(response.body[0].title).to.be.a("string");
        expect(response.body[0].body).to.be.a("string");
      });
    });
  }
);

Given(/^quando informar os dados para buscar os posts com id invalido "([^"]*)"$/, (methods) => {
    result = cy.apiPostsGet(methods, buscaMassa('id_get_invalido')).then((response) => (result = response));
});

Then(/^validar a busca de um posts por id não existente com sucesso "([^"]*)"$/, (statusCode) => {
    cy.wrap(result).then((response) => {
		// Verificar se o retorno do status é not found 404
		expect(String(response.status)).to.eq(buscaMassa(statusCode));
		// Verificar se o corpo é um objeto vazio
		expect(response.body).to.deep.equal({});
	  });
});
