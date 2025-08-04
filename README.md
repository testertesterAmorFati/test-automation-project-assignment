# test-automation-project-assignment

## Setup

1. Clone repo
2. Install Node.js
3. Install Docker
4. Download the docker-compose file
5. Navigate to the directory where the docker-compose.yml file is located
6. Run: `docker-compose up -d`
7. Navigate to http://localhost:8002/ in your browser
8. Install package.json dev dependencies of the root directory
9. Run: `npx cypress open` to open Cypress Test Runner
10. Click workspaces.cy.js to execute the tests
11. Run: `npx cypress run --reporter cypress-mochawesome-reporter` to generate a html report


## Design

The test automation framework is created based on the Page Object Model principle, which is the most common test automation framework design architecture.
Every application module has a page object, where shared steps, methods and verifications belonging to the page are written.
Test logic is written in the cy.js files with a dedicated module name.

The tests have the common elements: shared beforEach hook to not repeat the same actions for preparing the test state, the test itself, where e2e workflow is executed, and the expected result (assertion), which checks that the test is working based on the expected acceptance requirements.

There is also afterEach hook, that tears down the state of the test and prepares a clean state for the next test, since the tests should be running independently and do not depend on each other.
There is a centralized file of selectors that helps to update the repeated selectors in a singular place. The selectors are used with test id in the framework, which is the best practice for robust selectors. They are more immune to frontend changes.

In the tests, there are backend queries from which the information is extracted to assert certain values on the frontend. In this way, it is avoided to hardcode the data and tests become more dynamic. It helps from the maintenance point of view. Also, it checks that backend data is the same as it is presented on the frontend. It guards against the bugs between frontend and backend integration. In some other cases, the queries are made to clean up the state, so it is avoided to use UI, which would take more time to execute the actions, tests would become more long, and, therefore, more prone to flakiness.

In the Cypress config file, it is placed the common centralized configuration, like the baseUrl, the baseUrl for Api, default env name. These variables are used all over the tests, so if they change (e. g. different env), it would be easy and simple to change the env variables just in one place for the test project.

In some tests, assertions are made to wait for the backend query to be finished before executing the test steps. It is made to avoid using the hardcoded waits and ensure that the data is loaded fully before making the assertions on the frontend side.

When creating the reusable methods in the PO file, it is kept in mind that steps can be reused with different test data and it is intended to have a clear separation between common methods and verification functions. So, if the function verifies something, it does not do anything extra based on specific state. In this case, the steps would be reusable easily in the spec files where test logic is written and presented. 

There is an integrated Mochawesome reporter where tests can be run in a headless mode and it is possible quickly to check results with generated an html report. If a test fails, there is an attached image to investigate the root cause.

Every test has a designated id. If the test suit grows, it helps easily to map the test cases with test ids. It simplifies the work when it is needed to update the tests. Also, it helps with analyzing the tests, identifying the flaky ones, and test coverage analysis.

There is also implemented a retry mechanism in cypress config file that helps to rerun the tests up to 3 times in the pipelines when the tests are flaky for the env or backend issues.

Currently, configuration files are not created where test data could be written that can change based on the diff environment and there are no created custom cy functions that could be shared between the spec files, as it was a small scope test automation exercise.
