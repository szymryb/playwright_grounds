### Guidelines for E2E Testing with Playwright

#### Configuration & Setup

- Initialize configuration with Chromium/Desktop Chrome browser only
- Use environment variables for configuration management
- Set up browser contexts for test environment isolation

#### Page Object Model & Element Selection

- Implement the Page Object Model pattern for maintainable tests
- Use locators for resilient element selection

#### Testing Strategies

- Record tests with the codegen tool
- Parameterize tests to run with multiple data sets
- Implement test retries for flaky tests
- Configure test annotations for categorization and filtering

#### Assertions & Validation

- Apply expect assertions with specific matchers
- Implement visual comparison using `expect(page).toHaveScreenshot()
- Validate backend functionality via API testing
- Verify accessibility compliance through Playwright's accessibility testing features

#### Debugging & Reporting

- Use the trace viewer for test failure diagnosis
- Generate test reports with built-in or custom reporters

#### Test Organization & Performance

- Organize and execute tests via Playwright Test Runner
- Configure test hooks for setup and teardown operations
- Enable parallel execution to optimize test runs
- Use built-in test fixtures for common setup tasks
- Implement network interception for mocking and spying on requests
