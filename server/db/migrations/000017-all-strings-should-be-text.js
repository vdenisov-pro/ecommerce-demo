module.exports = {
  up: (queryInterface) => queryInterface.sequelize.query(`
    ALTER TABLE "Address" ALTER COLUMN street TYPE text USING street::text;
    ALTER TABLE "Address" ALTER COLUMN comment TYPE text USING comment::text;
    
    ALTER TABLE "Auth" ALTER COLUMN "firebaseUID" TYPE text USING "firebaseUID"::text;
    
    ALTER TABLE "Category" ALTER COLUMN name TYPE text USING name::text;
    ALTER TABLE "Category" ALTER COLUMN description TYPE text USING description::text;
    
    ALTER TABLE "City" ALTER COLUMN name TYPE text USING name::text;
    
    ALTER TABLE "Company" ALTER COLUMN name TYPE text USING name::text;
    ALTER TABLE "Country" ALTER COLUMN name TYPE text USING name::text;
    
    ALTER TABLE "Image" ALTER COLUMN original TYPE text USING original::text;
    ALTER TABLE "Image" ALTER COLUMN xsmall TYPE text USING xsmall::text;
    ALTER TABLE "Image" ALTER COLUMN small TYPE text USING small::text;
    ALTER TABLE "Image" ALTER COLUMN medium TYPE text USING medium::text;
    ALTER TABLE "Image" ALTER COLUMN large TYPE text USING large::text;
    
    ALTER TABLE "LegalPerson" ALTER COLUMN type TYPE text USING type::text;
    ALTER TABLE "LegalPerson" ALTER COLUMN name TYPE text USING name::text;
    
    ALTER TABLE "Order" ALTER COLUMN "paymentMethod" TYPE text USING "paymentMethod"::text;
    ALTER TABLE "Order" ALTER COLUMN code TYPE text USING code::text;
    ALTER TABLE "Order" ALTER COLUMN status TYPE text USING status::text;
    
    ALTER TABLE "Product" ALTER COLUMN name TYPE text USING name::text;
    ALTER TABLE "Product" ALTER COLUMN description TYPE text USING description::text;
    ALTER TABLE "Product" ALTER COLUMN producer TYPE text USING producer::text;
    ALTER TABLE "Product" ALTER COLUMN "producerCountry" TYPE text USING "producerCountry"::text;
    ALTER TABLE "Product" ALTER COLUMN code TYPE text USING code::text;
    ALTER TABLE "Product" ALTER COLUMN "boxType" TYPE text USING "boxType"::text;
    
    ALTER TABLE "User" ALTER COLUMN role TYPE text USING role::text;
    ALTER TABLE "User" ALTER COLUMN status TYPE text USING status::text;
    ALTER TABLE "User" ALTER COLUMN email TYPE text USING email::text;
    ALTER TABLE "User" ALTER COLUMN password TYPE text USING password::text;
    ALTER TABLE "User" ALTER COLUMN name TYPE text USING name::text;
    ALTER TABLE "User" ALTER COLUMN phone TYPE text USING phone::text;
    ALTER TABLE "User" ALTER COLUMN description TYPE text USING description::text;
  `),

  down: (queryInterface) => queryInterface.sequelize.query(`
    ALTER TABLE "Address" ALTER COLUMN street TYPE varchar(255) USING street::varchar(255);
    ALTER TABLE "Address" ALTER COLUMN comment TYPE varchar(255) USING comment::varchar(255);
    
    ALTER TABLE "Auth" ALTER COLUMN "firebaseUID" TYPE varchar(255) USING "firebaseUID"::varchar(255);
    
    ALTER TABLE "Category" ALTER COLUMN name TYPE varchar(255) USING name::varchar(255);
    ALTER TABLE "Category" ALTER COLUMN description TYPE varchar(255) USING description::varchar(255);
    
    ALTER TABLE "City" ALTER COLUMN name TYPE varchar(255) USING name::varchar(255);
    
    ALTER TABLE "Company" ALTER COLUMN name TYPE varchar(255) USING name::varchar(255);
    ALTER TABLE "Country" ALTER COLUMN name TYPE varchar(255) USING name::varchar(255);
    
    ALTER TABLE "Image" ALTER COLUMN original TYPE varchar(255) USING original::varchar(255);
    ALTER TABLE "Image" ALTER COLUMN xsmall TYPE varchar(255) USING xsmall::varchar(255);
    ALTER TABLE "Image" ALTER COLUMN small TYPE varchar(255) USING small::varchar(255);
    ALTER TABLE "Image" ALTER COLUMN medium TYPE varchar(255) USING medium::varchar(255);
    ALTER TABLE "Image" ALTER COLUMN large TYPE varchar(255) USING large::varchar(255);
    
    ALTER TABLE "LegalPerson" ALTER COLUMN type TYPE varchar(255) USING type::varchar(255);
    ALTER TABLE "LegalPerson" ALTER COLUMN name TYPE varchar(255) USING name::varchar(255);
    
    ALTER TABLE "Order" ALTER COLUMN "paymentMethod" TYPE varchar(255) USING "paymentMethod"::varchar(255);
    ALTER TABLE "Order" ALTER COLUMN code TYPE varchar(255) USING code::varchar(255);
    ALTER TABLE "Order" ALTER COLUMN status TYPE varchar(255) USING status::varchar(255);
    
    ALTER TABLE "Product" ALTER COLUMN name TYPE varchar(255) USING name::varchar(255);
    ALTER TABLE "Product" ALTER COLUMN description TYPE varchar(255) USING description::varchar(255);
    ALTER TABLE "Product" ALTER COLUMN producer TYPE varchar(255) USING producer::varchar(255);
    ALTER TABLE "Product" ALTER COLUMN "producerCountry" TYPE varchar(255) USING "producerCountry"::varchar(255);
    ALTER TABLE "Product" ALTER COLUMN code TYPE varchar(255) USING code::varchar(255);
    ALTER TABLE "Product" ALTER COLUMN "boxType" TYPE varchar(255) USING "boxType"::varchar(255);
    
    ALTER TABLE "User" ALTER COLUMN role TYPE varchar(255) USING role::varchar(255);
    ALTER TABLE "User" ALTER COLUMN status TYPE varchar(255) USING status::varchar(255);
    ALTER TABLE "User" ALTER COLUMN email TYPE varchar(255) USING email::varchar(255);
    ALTER TABLE "User" ALTER COLUMN password TYPE varchar(255) USING password::varchar(255);
    ALTER TABLE "User" ALTER COLUMN name TYPE varchar(255) USING name::varchar(255);
    ALTER TABLE "User" ALTER COLUMN phone TYPE varchar(255) USING phone::varchar(255);
    ALTER TABLE "User" ALTER COLUMN description TYPE varchar(255) USING description::varchar(255);
  `),
};
