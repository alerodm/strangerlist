# STRANGERLIST Challenge

Node.js and Webdriver.io were chosen to solve this challenge to align with the tooling used by the company.

As requested by the challenge description:
* Test-cases are detailed [here](./docs/test_cases.md).
* Issues found in the project are detailed [here](./docs/issues.md).

## TO-DO LIST

* Only desktop browsers are supported. I have no experience with mobile platforms and I wasn't sure how much time it would take me to get that running, so I preferred to focus on the rest of requirements.
* Find a better clean-up method for created items. This would depend on finding a way to obtain the item id.
* Polish code.

## How to setup the project & execute tests for desktop

### Local

This test project was tested under node v20.11.1, npm 10.2.4 and latest Chrome. Other combinations might have unexpected issues.

To install dependencies please run:
`npm install`

To execute tests run:
`STRANGER_BASE_URL=http://localhost:3000/ npm run test`

Tests are configured to run headless by default. This can be disabled by modifying the capabilities entry in the wdio.conf.js file.

### Docker

If you don't want to deal with setup and dependencies, running through docker is the recommended option.

First you need to build the image. Assuming docker is installed and running open a terminal, move to the root of the project and run this command:
`docker build -t strangerlist .`

After the image is built, you can run this command whenenver you want to create a container and run the tests:
`docker run --rm -e STRANGER_BASE_URL=http://the-url.com/stranger/ strangerlist`

Don't forget to modify the base url in the command!
In case you want to target your local running angular-strangerlist app, you can do so by using this internal url `http://host.docker.internal:3000`.

Lastly, remember to re-build the image every time the source code of the project changes.

### Docker Compose

I provided a sample docker-compose.yml as requested, but I cannot test it as the repo of the angular-strangerlist app doesn't contain a dockerfile.
