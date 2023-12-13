import { faker } from "@faker-js/faker";

const { buscaMassa } = require("../commons/geral.commons");

let result;
let payload;

Given(
  /^quando informar os dados para montar o payload com o post_posts, "([^"]*)"$/,
  (methods) => {
    payload = JSON.stringify({
      title: "Teste prova js cypress",
      body: `${faker.internet.userName()} - ${faker.internet.email()}`,
      userId: 1000,
    });

    result = cy
      .apiPostsPost(methods, payload)
      .then((response) => (result = response));
  }
);

Then(
  /^validar o retorno da post_posts com o "([^"]*)" e seu contrato$/,
  (statusCode) => {
    cy.wrap(result).then((response) => {
      // Verificar se o retorno do status é create = 201
      expect(String(response.status)).to.eq(buscaMassa(statusCode));

      // Verificar se as chaves estão presentes
      expect(response.body).to.have.all.keys(
        "userId",
        "id",
        "title",
        "body"
      );

      // Verificar os tipos dos valores são number ou string
      expect(response.body.userId).to.be.a("number");
      expect(response.body.id).to.be.a("number");
      expect(response.body.title).to.be.a("string");
      expect(response.body.body).to.be.a("string");

      // Verificar se o retorno dos dados são os mesmos
      expect(response.body.userId).to.eqls(JSON.parse(payload).userId);
      expect(response.body.title).to.eqls(JSON.parse(payload).title);
      expect(response.body.body).to.eqls(JSON.parse(payload).body);
    });
  }
);

Given(/^quando informar os dados invalidos para montar o payload com o post_posts, "([^"]*)"$/, (methods) => {
  payload = JSON.stringify({
    title: 1000,
    body: `${faker.internet.userName()} - ${faker.internet.email()}`,
    userId: "Teste prova js cypress",
  });

  result = cy
    .apiPostsPost(methods, payload)
    .then((response) => (result = response));
});

Then(/^validar o retorno not found quando inserido dados e tipagem invalidas no body$/, () => {
  cy.wrap(result).then((response) => {
    // Verificar se o retorno do status é not_found
    expect(String(response.status)).to.eq(buscaMassa('status_code not_found'));
  });
});
