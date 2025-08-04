export class Selectors {
  workspace = {
    overviewTitle: ".workspace-overview-title",
    linkDefault: '[data-testid="workspace-link-default"]',
    numberOfServicesValue: '[data-testid="Services"] > .metric-value',
  };
  gatewayService = {
    createFormSubmitBtn: '[data-testid="service-create-form-submit"]',
    nameInput: '[data-testid="gateway-service-name-input"]',
    urlInput: '[data-testid="gateway-service-url-input"]',
    sidebarItemGatewayServices: '[data-testid="sidebar-item-gateway-services"]',
  };
  route = {
    createRouteSubmitBtn: '[data-testid="route-create-form-submit"]',
    formNameInput: '[data-testid="route-form-name"]',
    formTagsInput: '[data-testid="route-form-tags"]',
    selectServicedd:
      '[data-testid="select-wrapper"] [placeholder="Select a service"]',
    pathInput: '[data-testid="route-form-paths-input-1"]',
    hostInput: '[data-testid="route-form-hosts-input-1"]',
    sidebarItemRoutes: '[data-testid="sidebar-item-routes"]',
  };
  table = {
    headerName: '[data-testid="table-header-name"]',
  };

  el = {
    toasterMessage: ".toaster-message",
    idValue: '[data-testid="id-copy-uuid"] .copy-text',
    multiSelectTrigger: '[data-testid="multiselect-trigger"]',
    multiSelectionDdInput: '[data-testid="multiselect-dropdown-input"]',
    selectionBadgesCtn: '[data-testid="selection-badges-container"]',
  };

  btn = {
    emptyStateAction: '[data-testid="empty-state-action"]',
  };
}

export const selectors = new Selectors();
