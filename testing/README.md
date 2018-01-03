XP JavaScript UI Testing
===

### Building

Before trying to run tests, you need to verify that the following software are installed:

* Java 8 (update 92 or above) for building and running;
* node.js installed on system;
* gulp installed globally `npm i -g gulp` (_optional_);
* Git installed on system;
* Chrome browser installed on system.

Run tests for Users Application:
  1. `gradle testUsersApp'
  2. `gradle testUsersAppLocally'

### Reporting

```
allure generate allure-results --clean -o allure-report && allure open allure-report
```

