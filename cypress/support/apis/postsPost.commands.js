import { typeUrl } from "../hooks";

Cypress.Commands.add("apiPostsPost", (methods, body) => {
  return cy
    .request({
      method: methods,
      url: `${typeUrl}posts`,
      failOnStatusCode: false,
      redirect: "follow",
      body,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then((response) => {
      return response;
    });
});
