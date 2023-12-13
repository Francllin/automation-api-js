import { typeUrl } from "../hooks";

Cypress.Commands.add("apiPostsGet", (methods, id = false) => {
  const path = id ? `posts/${id}` : 'posts'
  return cy
    .request({
      method: methods,
      url: `${typeUrl}${path}`,
      failOnStatusCode: false,
      redirect: "follow",
    })
    .then((response) => {
      return response;
    });
});