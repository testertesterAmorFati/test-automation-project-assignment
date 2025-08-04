import { gatewayServicesPage } from "../pages/gatewayServicesPage.po";
import { routesPage } from "../pages/routesPage.po";
import { workSpacesPage } from "../pages/workspacesPage.po";
import { selectors } from "../../support/selectors";

let servicesIdsToDelete = [];
let routesIdsToDelete = [];

describe("Workspaces", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  afterEach(() => {
    for (const id of routesIdsToDelete) {
      routesPage.deleteRoutesViaAPI(id);
    }

    for (const id of servicesIdsToDelete) {
      gatewayServicesPage.deleteGatewayServiceViaAPI(id);
    }
  });

  it("[1] page should load correctly", () => {
    cy.get(selectors.workspace.overviewTitle)
      .contains("Workspaces")
      .should("be.visible");
    cy.get("body").should("be.visible");
    cy.url().should("eq", Cypress.config().baseUrl + "/workspaces");
    cy.title().should("include", "Workspaces | Kong Manager");
  });

  it("[2] default created workspace should be visible", () => {
    cy.intercept(
      "GET",
      "/workspaces?size=15&sort_by=created_at&counter=true"
    ).as("getWorkspaces");
    cy.get(selectors.table.headerName)
      .contains("Workspace Name")
      .should("be.visible");
    cy.wait("@getWorkspaces").its("response.statusCode").should("eq", 200);
    workSpacesPage
      .getDefaultWorkspaceName(
        Cypress.config().baseUrlAPI +
          "/workspaces?size=15&sort_by=created_at&counter=true"
      )
      .then((name) => {
        cy.get(selectors.workspace.linkDefault)
          .contains(name)
          .should("be.visible");
          expect(name).to.equal(Cypress.env("defaultEnv"))
      });
  });

  it("[3] default workspace should have 0 services", () => {
    workSpacesPage
      .getWorkSpaceNumberOfServices("default")
      .then((numberOfServices) => {
        cy.get(selectors.workspace.numberOfServicesValue)
          .contains(numberOfServices)
          .should("be.visible");
        expect(numberOfServices, "number of services").to.be.equal(0);
      });
  });

  it("[4] new gateway service should be created successfully ", () => {
    workSpacesPage.navigateToDefaultWorkSpace();
    workSpacesPage.navigateToGatewayServices();
    gatewayServicesPage.addNewGatewayService();
    cy.get(selectors.gatewayService.createFormSubmitBtn).should("be.disabled");
    gatewayServicesPage.typeGateWayServiceURL(
      "https://api.kong-air.com/flights"
    );
    cy.get(selectors.gatewayService.createFormSubmitBtn).should("be.enabled");
    cy.get(selectors.gatewayService.nameInput)
      .invoke("val")
      .then((name) => {
        gatewayServicesPage.clickSaveButton();
        cy.contains(
          selectors.el.toasterMessage,
          `Gateway Service "${name}" successfully created!`
        ).should("be.visible");
      });
    cy.get(selectors.el.idValue)
      .invoke("text")
      .then((id) => {
        gatewayServicesPage.deleteGatewayServiceViaAPI(id);
      });
  });

  it("[5] new route with an existing gateway service should be configured successfully", () => {
    const uniqueId = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
    const serviceName = `new-service-${uniqueId}`;
    const routeName = `new-route-${uniqueId}`;
    gatewayServicesPage
      .createGatewayServiceViaAPI(serviceName)
      .then((gateWayServiceId) => {
        servicesIdsToDelete.push(gateWayServiceId);

        cy.intercept(
          "GET",
          `${Cypress.config().baseUrlAPI}/${Cypress.env(
            "defaultEnv"
          )}/routes?sort_desc=1&size=30`
        ).as("getServices");
        routesPage.navigateToRoute();
        cy.wait("@getServices").its("response.statusCode").should("eq", 200);
        routesPage.addNewRoute();
        cy.get(selectors.route.createRouteSubmitBtn).should("be.disabled");
        routesPage.typeName(routeName);
        routesPage.selectService(gateWayServiceId);
        routesPage.enterListOfTags(3);
        const methodsToSelect = ["GET", "POST", "DELETE"];
        routesPage.selectMethods(["GET", "POST", "DELETE"]);
        routesPage.verifySelectedMethods(methodsToSelect);
        routesPage.typePath("/api/v1");
        routesPage.typeHost("example.com");
        cy.get(selectors.route.createRouteSubmitBtn).should("be.enabled");
        routesPage.clickSaveButton();
        cy.contains(
          selectors.el.toasterMessage,
          `Route "${routeName}" successfully created!`
        ).should("be.visible");

        cy.get(selectors.el.idValue)
          .invoke("text")
          .then((routeId) => {
            routesIdsToDelete.push(routeId);
          });
      });
  });
});
