# STRANGERLIST Challenge

Node.js and Webdriver.io were chosen to solve this challenge to align with the tooling used by the company.
Since I had never used wdio before I maintained the structure suggested by the tool botstraping option.

As requested by the challenge description:
* Test-cases are detailed [here](./docs/test_cases.md).
* Issues found in the project are detailed [here](./docs/issues.md).

The only requirement missing is the mobile support. I have no experience with that platform and I had no idea how much I would take me to get things running, so I preferred to focus on the rest of the challenge.

## How to setup the project & execute tests for desktop

### Local

This test project was tested under node v20.11.1 and npm 10.2.4. Other combinations might have unexpected issues.

To install dependencies please run:
`npm install`

To execute tests run:
`STRANGER_BASE_URL=http://localhost:3000/ npm run test`

### Docker

If you don't want to deal with setup and dependencies, running through docker is the recommended option.

First you need to build the image. Assuming docker is installed and running open a terminal, move to the root of the project and run this command:
`docker build -t strangerlist .`

After the image is built, you can run this command whenenver you want to create a container and run the tests:
`docker run --rm -e STRANGER_BASE_URL=http://the-url.com/stranger/ strangerlist`

Don't forget to modify the base url in the command!
And in case you want to target your local running project, you can do so by using this internal url `http://host.docker.internal:3000`.

Lastly, remember to re-build the image every time the source code of the project changes.
