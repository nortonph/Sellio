# Sellio
*Effortlessly* sell your second-hand items

## Overview
Sellio is a platform designed to simplify the process of selling second-hand items. This README will walk you through the setup and basic commands to get started with *Sellio*

## Prerequisites
Before starting, ensure you have the following installed:

- `Node.js` (version 16 or higher recommended)

* `npm` (usually bundled with Node.js)

## Getting Started
To set up and run Sellio, follow these steps:

1. Clone the Repository
Ensure you have a local copy of the Sellio repository. Just clone it

2. Navigate to the `/server` directory to manage the backend, and the `/client` directory for the frontend

3. Do `npm install` on both directories

4. Make sure MongoDB is installed and running, you can get it with `brew services start mongodb-community@8.0` in Terminal

5. Environment Variables:
  You need to create .env files for variables: `.env.development.local` and `.env.test.local`. For both there are example files `.env.development`and `.env.test`. Rename them and put in the needed information. They are ignored in .gitignore and should not leave your computer. `.env.test` is loaded when `NODE_ENV=test` is set by a script in `package.json` (e.g. `npm run test`, see below)

6. Get mock Data:
Run `npm seed` or `npm seed_test` in the `/server` directory. It will create mock Data in the sellio Database, depending on the command in a Database called *sellio* or *sellio_testing*

7. Use the following commands based on your needs (they do work on both directories):
   - `npm run start_test`: Starts both the server and client in the testing environment
   - `npm run start`: Launches the application for regular use
   - `npm run test`: Executes the test suite to ensure everything is functioning correctly

8. Server tests are located in `/server/test`and use mocha, chai and supertest to test the API routes (public and user routes only so far). In the test envionment, authMiddleware will be replaced a small custom middleware which takes the test user from the header sent by supertest, and injects it into the request.

## Additional Notes
Linting: Use `npm run lint` to ensure your code matches to project standards