import { selectors } from "../../support/selectors";

export class Routes {
  navigateToRoute() {
    cy.visit(`/${Cypress.env("defaultEnv")}/routes/create`);
    cy.get(selectors.route.sidebarItemRoutes).contains("Routes").click();
  }

  addNewRoute() {
    cy.get(selectors.btn.emptyStateAction).contains("New route").click();
  }

  typeName(name) {
    cy.get(selectors.route.formNameInput).type(name);
  }

  selectService(id) {
    cy.get(
      selectors.route.selectServicedd
    ).click();
    cy.get(`[data-testid="select-item-${id}"]`).should("be.visible");
    cy.get(`[data-testid="select-item-${id}"]`).click();
  }

  enterListOfTags(numberOfTags) {
    Array.from({ length: numberOfTags }).forEach((_, i) => {
      const tag = `tag-${i + 1}`;
      cy.get(selectors.route.formTagsInput).type(`${tag}, {enter}`);
    });
  }

  selectMethods(methods) {
    cy.get(selectors.el.multiSelectTrigger)
      .contains("Select methods")
      .click();
    const methodsList = Array.isArray(methods) ? methods : [methods];

    methodsList.forEach((method) => {
      cy.get(`[data-testid="multiselect-item-${method}"]`).click();
    });

    cy.get(selectors.el.multiSelectionDdInput).type("{esc}");
  }

  verifySelectedMethods(methods) {
    const methodsList = Array.isArray(methods) ? methods : [methods];
    methodsList.forEach((method) => {
      cy.get(selectors.el.selectionBadgesCtn)
        .contains(method)
        .should("be.visible");
    });
  }

  typePath(path) {
    cy.get(selectors.route.pathInput).type(path);
  }

  typeHost(host) {
    cy.get(selectors.route.hostInput).type(host);
  }

  typeName(name) {
    cy.get(selectors.route.formNameInput).type(name);
  }

  clickSaveButton() {
    cy.get(selectors.route.createRouteSubmitBtn).contains("Save").click();
  }

  deleteRoutesViaAPI(id) {
    return cy
      .request({
        method: "DELETE",
        url: `${Cypress.config().baseUrlAPI}/${Cypress.env("defaultEnv")}/routes/${id}/`,
        headers: {
          Accept: "application/json",
        },
      })
      .then((response) => {
        expect(response.status).to.equal(204);
      });
  }
}

export const routesPage = new Routes();
