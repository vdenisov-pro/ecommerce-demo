module.exports = {
  up: (queryInterface) => queryInterface.sequelize.query(`
    ALTER TABLE "Address" ALTER COLUMN house TYPE varchar(255) USING house::varchar(255);
    ALTER TABLE "Address" ALTER COLUMN house SET NOT NULL;
  `),

  down: (queryInterface) => queryInterface.sequelize.query(`
    ALTER TABLE "Address" ALTER COLUMN house DROP NOT NULL;
    UPDATE "Address" SET house = 0;
    ALTER TABLE "Address" ALTER COLUMN house TYPE integer USING house::integer;
    ALTER TABLE "Address" ALTER COLUMN house SET NOT NULL;
  `),
};
