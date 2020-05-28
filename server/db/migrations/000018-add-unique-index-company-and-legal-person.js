module.exports = {
  up: (queryInterface) => queryInterface.sequelize.query(`
    create unique index Company_name_uindex on "Company" (name);
    create unique index LegalPerson_type_name_uindex on "LegalPerson" (type, name);
  `),

  down: (queryInterface) => queryInterface.sequelize.query(`
    drop index Company_name_uindex;
    drop index LegalPerson_type_name_uindex;
  `),
};
