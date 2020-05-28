const { CompanySchema } = require('./company.schema');

const { CountrySchema } = require('./country.schema');
const { CitySchema } = require('./city.schema');
const { AddressSchema } = require('./address.schema');

const { UserSchema } = require('./user.schema');
const { AuthSchema } = require('./auth.schema');
const { ManagementSchema } = require('./management.schema');
const { LegalPersonSchema } = require('./legal-person.schema');

const { CategorySchema } = require('./category.schema');
const { ProductSchema } = require('./product.schema');
const { ImageSchema } = require('./image.schema');

const { OrderSchema } = require('./order.schema');
const { OrderItemSchema } = require('./order-item.schema');


// Company
CompanySchema.hasMany(AddressSchema, { as: 'addresses', foreignKey: 'companyId' });
CompanySchema.hasMany(LegalPersonSchema, { as: 'legalPeople', foreignKey: 'companyId' });
CompanySchema.hasOne(UserSchema, { as: 'manager', foreignKey: 'companyId' });
CompanySchema.hasMany(UserSchema, { as: 'clients', foreignKey: 'companyId' });

// Country
CountrySchema.hasMany(CitySchema, { as: 'cities', foreignKey: 'countryId' });

// City
CitySchema.belongsTo(CountrySchema, { as: 'country', foreignKey: 'countryId' });
CitySchema.hasMany(AddressSchema, { as: 'addresses', foreignKey: 'cityId' });

// Address
AddressSchema.belongsTo(CitySchema, { as: 'city', foreignKey: 'cityId' });
AddressSchema.belongsTo(CompanySchema, { as: 'company', foreignKey: 'companyId' });
AddressSchema.belongsTo(UserSchema, { as: 'courier', foreignKey: 'courierId' });

// User
UserSchema.hasOne(AuthSchema, { as: 'auth_info', foreignKey: 'databaseUID' });
UserSchema.hasOne(ManagementSchema, { as: 'ManagerForClient', foreignKey: 'clientId' });
UserSchema.hasMany(ManagementSchema, { as: 'ClientsForManager', foreignKey: 'managerId' });
UserSchema.belongsTo(CompanySchema, { as: 'company', foreignKey: 'companyId' });
UserSchema.hasMany(AddressSchema, { as: 'addresses', foreignKey: 'courierId' });

// Auth
AuthSchema.belongsTo(UserSchema, { as: 'user', foreignKey: 'databaseUID' });

// Management
ManagementSchema.belongsTo(UserSchema, { as: 'manager', foreignKey: 'managerId' });
ManagementSchema.belongsTo(UserSchema, { as: 'client', foreignKey: 'clientId' });

// LegalPerson
LegalPersonSchema.belongsTo(CompanySchema, { as: 'company', foreignKey: 'companyId' });

// Category
CategorySchema.hasMany(ProductSchema, { as: 'products', foreignKey: 'categoryId' });

// Product
ProductSchema.belongsTo(CategorySchema, { as: 'category', foreignKey: 'categoryId' });
ProductSchema.hasMany(ImageSchema, { as: 'images', foreignKey: 'productId' });

// Image
ImageSchema.belongsTo(ProductSchema, { as: 'product', foreignKey: 'productId' });

// Order
OrderSchema.belongsTo(CompanySchema, { as: 'company', foreignKey: 'companyId' });
OrderSchema.belongsTo(LegalPersonSchema, { as: 'legalPerson', foreignKey: 'legalPeopleId' });
OrderSchema.belongsTo(UserSchema, { as: 'client', foreignKey: 'clientId' });
OrderSchema.belongsTo(UserSchema, { as: 'manager', foreignKey: 'managerId' });
OrderSchema.belongsTo(AddressSchema, { as: 'address', foreignKey: 'addressId' });
OrderSchema.belongsTo(UserSchema, { as: 'author', foreignKey: 'authorId' });

// OrderItem
OrderItemSchema.belongsTo(ProductSchema, { as: 'product', foreignKey: 'productId' });


module.exports = {
  CompanySchema,

  CountrySchema,
  CitySchema,
  AddressSchema,

  UserSchema,
  AuthSchema,
  ManagementSchema,
  LegalPersonSchema,

  CategorySchema,
  ProductSchema,
  ImageSchema,

  OrderSchema,
  OrderItemSchema,
};
