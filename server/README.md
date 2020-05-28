# Description

The project is an API server for "sweet-pay" application.

## Basic information

* Technology stack: [Node](https://nodejs.org), [Express](https://expressjs.com), [Firebase](https://firebase.google.com)
* Database info: [PostgreSQL](https://www.postgresql.org/) , [Diagram for DB](https://app.sqldbm.com/SQLServer/Edit/p58718/#)
* Documentation: [ApiDoc](http://46.173.218.252:7000)
* Environment: "local" / "dev" / "test" / "prod"

#### !!! ONLY "LOCAL" ENVIRONMENT SHOULD BE USED DURING DEVELOPMENT !!!

To do this, you must create a new or update an existing file ```local.js``` in ```config/``` folder
(it must be filled in by analogy with the file ```development.js```).

## STEP 1: migrations

#### => apply all migrations
```sh
$> make db-<ENV>-migrate-up
```

#### => cancel one migration
```sh
$> make db-<ENV>-migrate-undo
```

#### => cancel all migrations
```sh
$> make db-<ENV>-migrate-reset
```

## STEP 2: starting

#### => normal start
```sh
$> npm run start:<ENV>
```

#### => start with docs
```sh
$> npm run start:<ENV>:live
```

## STEP 3: documentation

#### => update docs
```sh
$> make docs-update
```

#### => start docs
```sh
$> make docs-start
```
