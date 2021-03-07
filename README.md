## User Count API

This API was built for blog [Build a User Signup Counter with Arduino, Part 2](https://auth0.com/blog/build-user-signup-counter-with-arduino-part2/).

Authenticated Node API that keeps track of user signups.

## Setup

Clone the repo.

```
git clone git@github.com:schamblee-auth0/user-counter-api.git
```

Create a `.env` file for sensitive Auth0 tenant info

```
touch .env
```

Add Auth0 tenant info to `.env` file

```
AUTH0_AUDIENCE=YOUR_API_IDENTIFIER
AUTH0_DOMAIN=YOUR_AUTH0_DOMAIN
```

Install packages and start the API

```
cd user-counter-api
npm install && npm start
```

## Usage

Increase count with POST request

```
curl -X POST http://localhost:8000/
```

Retrieve count with GET request

```
curl -X GET http://localhost:8000/
```
