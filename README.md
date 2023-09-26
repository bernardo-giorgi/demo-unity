# demo-unity
### Installation Steps
- Clone this repository
- Execute `npm i`.

### Execution test
Run `npm run cypress:open` to execute the E2E tests via [Cypress] browser

Run `npm run cypress:run` to execute the E2E test via terminal

### E2E with Docker

Run `docker build -t cypress-e2e .`
Run `docker run --rm -e NO_COLOR=1 -e TEST_TAGS=product -e environment=prod cypress-e2e --config video=false'`