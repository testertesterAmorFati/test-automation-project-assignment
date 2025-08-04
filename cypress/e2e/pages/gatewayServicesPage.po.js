import { selectors } from "../../support/selectors";

export class GatewayServices {
  addNewGatewayService() {
    cy.get(selectors.btn.emptyStateAction)
      .contains("New gateway service")
      .click();
  }

  typeGateWayServiceURL(url) {
    cy.get(selectors.gatewayService.urlInput).type(url);
  }

  clickSaveButton() {
    cy.get(selectors.gatewayService.createFormSubmitBtn)
      .contains("Save")
      .click();
  }

  deleteGatewayServiceViaAPI(id) {
    return cy
      .request({
        method: "DELETE",
        url: `${Cypress.config().baseUrlAPI}/${Cypress.env("defaultEnv")}/services/${id}/`,
        headers: {
          Accept: "application/json",
        },
      })
      .then((response) => {
        expect(response.status).to.equal(204);
      });
  }

  createGatewayServiceViaAPI(name) {
    return cy
      .request({
        method: "POST",
        url: `${Cypress.config().baseUrlAPI}/${Cypress.env("defaultEnv")}/services/`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: {
          name: name,
          tags: null,
          read_timeout: 60000,
          retries: 5,
          connect_timeout: 60000,
          ca_certificates: null,
          client_certificate: null,
          write_timeout: 60000,
          port: 443,
          url: "https://api.kong-air.com/flights",
        },
      })
      .then((response) => {
        expect(response.status).to.equal(201);
        return response.body.id;
      });
  }
}

export const gatewayServicesPage = new GatewayServices();
