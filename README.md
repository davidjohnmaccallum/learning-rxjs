# Learning RxJS

I am learning RxJS by going through the [documentation](https://rxjs-dev.firebaseapp.com/guide/overview) and using it as a set of exercises.

## Getting started

```sh
npm install
node server.js
ts-node src/creationOperators.ts # Use the if statements to switch the on/off each section.
```

## Practical 1: Playing with Bitbucket API

The goal of this practical is to get a list of repos from Bitbucket with their commits and commit authors.

To do this I will invoke the Bitbucket REST API using node-fetch. Convert the result into an Observable with HTTP error handling. And transform the result into the data format I desire.

Use src/practical-1-auth.html to get an access token. Apologies, it's not too clean. You will have to get the access token out of the URL.
