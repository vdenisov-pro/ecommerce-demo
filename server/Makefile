# ApiDoc

docs-update:
	./node_modules/.bin/apidoc -i ./app/components -o ./docs

docs-start:
	make docs-update; \
  ./node_modules/.bin/static-server ./docs -p 7000

# Database ("development" mode)

db-dev-migrate-up:
	./node_modules/.bin/cross-env    NODE_ENV=development \
	./node_modules/.bin/sequelize    db:migrate

db-dev-migrate-undo:
	./node_modules/.bin/cross-env    NODE_ENV=development \
	./node_modules/.bin/sequelize    db:migrate:undo

db-dev-migrate-reset:
	./node_modules/.bin/cross-env    NODE_ENV=development \
	./node_modules/.bin/sequelize    db:migrate:undo:all

# Database ("test" mode)

db-test-migrate-up:
	./node_modules/.bin/cross-env    NODE_ENV=test \
	./node_modules/.bin/sequelize    db:migrate

db-test-migrate-undo:
	./node_modules/.bin/cross-env    NODE_ENV=test \
	./node_modules/.bin/sequelize    db:migrate:undo

db-test-migrate-reset:
	./node_modules/.bin/cross-env    NODE_ENV=test \
	./node_modules/.bin/sequelize    db:migrate:undo:all

# Database ("production" mode)

db-prod-migrate-up:
	./node_modules/.bin/cross-env    NODE_ENV=production \
	./node_modules/.bin/sequelize    db:migrate

db-prod-migrate-undo:
	./node_modules/.bin/cross-env    NODE_ENV=production \
	./node_modules/.bin/sequelize    db:migrate:undo

db-prod-migrate-reset:
	./node_modules/.bin/cross-env    NODE_ENV=production \
	./node_modules/.bin/sequelize    db:migrate:undo:all

# Database ("my-local" mode)

db-local-migrate-up:
	./node_modules/.bin/cross-env    NODE_ENV=my-local \
	./node_modules/.bin/sequelize    db:migrate

db-local-migrate-undo:
	./node_modules/.bin/cross-env    NODE_ENV=my-local \
	./node_modules/.bin/sequelize    db:migrate:undo

db-local-migrate-reset:
	./node_modules/.bin/cross-env    NODE_ENV=my-local \
	./node_modules/.bin/sequelize    db:migrate:undo:all

