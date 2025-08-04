import { selectors } from "../../support/selectors";

export class Workspaces {
  getDefaultWorkspaceName(endPoint) {
    return cy
      .request({
        method: "GET",
        url: endPoint,
        headers: {
          Accept: "application/json",
        },
      })
      .then((response) => {
        expect(response.status).to.eq(200);
        return response.body.data[0].name;
      });
  }

  getWorkSpaceNumberOfServices(name) {
    return cy
      .request({
        method: "GET",
        url: `${Cypress.config().baseUrlAPI}/${name}/workspaces/${name}/meta`,
        headers: {
          Accept: "application/json",
        },
      })
      .then((response) => {
        return response.body.counts.services;
      });
  }

  navigateToDefaultWorkSpace() {
    cy.get(selectors.workspace.linkDefault)
      .contains(Cypress.env("defaultEnv"))
      .click();
  }

  navigateToGatewayServices() {
    cy.get(selectors.gatewayService.sidebarItemGatewayServices).contains("Gateway Services").click();
  }
}

export const workSpacesPage = new Workspaces();
