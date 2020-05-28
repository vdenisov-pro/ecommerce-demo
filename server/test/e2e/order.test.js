const supertest = require('supertest');
const chai = require('chai');
// const moment = require('moment');
const app = require('../../app/main');
const { regUser, authUser } = require('../tools/user');
const { getBody } = require('../tools/request');
// const {
//   CompanyModel,
//   // CountryModel,
//   // CityModel,
//   // AddressModel,
//   // LegalPersonModel,
//   ProductModel,
//   CategoryModel,
// } = require('../../app/models');

const request = supertest(app);
const { expect } = chai;

const headers = {
  'Content-Type': 'application/json',
};

describe('ORDERS', () => {
  // let createdOrder;
  before(async () => {
    headers.Authorization = await authUser(await regUser());
  });
  describe('GET /orders', async () => {
    context('Valid query', () => {
      let resBody;

      before(async () => {
        resBody = await request.get('/api/orders')
          .set(headers)
          .expect(200)
          .then(getBody);

        return resBody;
      });

      it('should return object', () => {
        expect(resBody).to.be.an('object');
      });

      it('return object should have results property that is an array', () => {
        expect(resBody).to.have.property('results')
          .that.is.an('array')
          .with.lengthOf(0);
      });

      it('return object should have count property that is a number', () => {
        expect(resBody).to.have.property('count')
          .that.is.a('number')
          .that.equals(0);
      });

      it('return object should have previous property that is a number', () => {
        expect(resBody).to.have.property('previous')
          .that.is.a('number')
          .that.equals(0);
      });

      it('return object should have next property that is a number', () => {
        expect(resBody).to.have.property('next')
          .that.is.a('number')
          .that.equals(0);
      });
    });
  });

  // describe('POST /orders', async () => {
  //   context('Valid input data', () => {
  //     let newOrder = {
  //       paymentMethod: 'cash',
  //       needDocuments: true,
  //       status: 'new',
  //       // deliveryDate: moment.utc().toISOString(),
  //       deliveryTimeMin: '11:00:00',
  //       deliveryTimeMax: '15:00:00',
  //       comment: 'comment',
  //       price: 0,
  //       discount: 0,
  //       totalPrice: 0,
  //     };
  //     let resBody;

  //     before(async () => {
  //       let companyObj;
  //       try {
  //         companyObj = await CompanyModel.createNew({
  //           name: 'test-company',
  //           managerId: 1,
  //         }).object;
  //       } catch (err) {
  //         console.log('\n\n\n ERR =>', err);
  //       }

  //       // const {
  //       //   object: countryObj,
  //       // } = await CountryModel.findOneOrCreate({
  //       //   name: 'Russia',
  //       // });
  //       // const {
  //       //   object: cityObj,
  //       // } = await CityModel.findOneOrCreate({
  //       //   countryId: countryObj.id,
  //       //   name: 'Taganrog',
  //       // });
  //       // const {
  //       //   object: addressObj,
  //       // } = await AddressModel.findOneOrCreate({
  //       //   cityId: cityObj.id,
  //       //   companyId: companyObj.id,
  //       //   street: 'Petrovskaya',
  //       //   house: 1,
  //       //   comment: 'no comments',
  //       //   courierId: 1,
  //       // });
  //       // const {
  //       //   object: legalPersonObj,
  //       // } = await LegalPersonModel.findOneOrCreate({
  //       //   companyId: companyObj.id,
  //       //   type: 'ИП',
  //       //   name: 'Иванов И.И.',
  //       // });
  //       newOrder = {
  //         ...newOrder,
  //         companyId: companyObj.id,
  //         // legalPeopleId: legalPersonObj.id,
  //         // addressId: addressObj.id,
  //         managerId: 1,
  //         clientId: 1,
  //       };
  //       try {
  //         resBody = await request.post('/api/orders')
  //         .set(headers)
  //         .send(newOrder)
  //         .expect(201)
  //         .then(getBody);
  //         console.log('CREATE ORDER =>', res);
  //       } catch (err) {
  //         console.log('\n\n\nERR =>', err);
  //       }


  //       createdOrder = resBody;

  //       return resBody;
  //     });

  //     it('should return object', () => {
  //       expect(resBody).to.be.an('object');
  //     });

  //     it('return object should have id property that is a number', () => {
  //       expect(resBody).to.have.property('id')
  //         .that.is.a('number');
  //     });

  //     it('return object should have companyId property that is a number', () => {
  //       expect(resBody).to.have.property('companyId')
  //         .that.is.a('number')
  //         .that.equals(newOrder.companyId);
  //     });

  //     it.skip('return object should have legalPeopleId property that is a number', () => {
  //       expect(resBody).to.have.property('legalPeopleId')
  //         .that.is.a('number')
  //         .that.equals(newOrder.legalPeopleId);
  //     });

  //     it('return object should have managerId property that is a number', () => {
  //       expect(resBody).to.have.property('managerId')
  //         .that.is.a('number')
  //         .that.equals(newOrder.managerId);
  //     });

  //     it('return object should have clientId property that is a number', () => {
  //       expect(resBody).to.have.property('clientId')
  //         .that.is.a('number')
  //         .that.equals(newOrder.clientId);
  //     });

  //     it('return object should have addressId property that is a null', () => {
  //       expect(resBody).to.have.property('addressId')
  //         .that.is.a('null')
  //         .that.equals(null);
  //     });

  //     it('return object should have paymentMethod property that is a string', () => {
  //       expect(resBody).to.have.property('paymentMethod')
  //         .that.is.a('string')
  //         .that.equals(newOrder.paymentMethod);
  //     });

  //     it('return object should have needDocuments property that is a boolean', () => {
  //       expect(resBody).to.have.property('needDocuments')
  //         .that.is.a('boolean')
  //         .that.equals(newOrder.needDocuments);
  //     });

  //     it('return object should have status property that is a string', () => {
  //       expect(resBody).to.have.property('status')
  //         .that.is.a('string')
  //         .that.equals(newOrder.status);
  //     });

  //     it('return object should have deliveryDate property that is a null', () => {
  //       expect(resBody).to.have.property('deliveryDate')
  //         .that.is.a('null')
  //         .that.equals(null);
  //     });

  //     it('return object should have deliveryTimeMin property that is a string', () => {
  //       expect(resBody).to.have.property('deliveryTimeMin')
  //         .that.is.a('string')
  //         .that.equals(newOrder.deliveryTimeMin);
  //     });

  //     it('return object should have deliveryTimeMax property that is a string', () => {
  //       expect(resBody).to.have.property('deliveryTimeMax')
  //         .that.is.a('string')
  //         .that.equals(newOrder.deliveryTimeMax);
  //     });

  //     it('return object should have comment property that is a string', () => {
  //       expect(resBody).to.have.property('comment')
  //         .that.is.a('string')
  //         .that.equals(newOrder.comment);
  //     });

  //     it('return object should have price property that is a number', () => {
  //       expect(resBody).to.have.property('price')
  //         .that.is.a('number')
  //         .that.equals(newOrder.price);
  //     });

  //     it('return object should have discount property that is a number', () => {
  //       expect(resBody).to.have.property('discount')
  //         .that.is.a('number')
  //         .that.equals(newOrder.discount);
  //     });

  //     it('return object should have totalPrice property that is a number', () => {
  //       expect(resBody).to.have.property('totalPrice')
  //         .that.is.a('number')
  //         .that.equals(newOrder.totalPrice);
  //     });

  //     it('return object should have userId property that is a number', () => {
  //       expect(resBody).to.have.property('userId')
  //         .that.is.a('number');
  //     });

  //     it('return object should have createdAt property that is a string', () => {
  //       expect(resBody).to.have.property('createdAt')
  //         .that.is.a('string');
  //     });

  //     it('return object should have updatedAt property that is a string', () => {
  //       expect(resBody).to.have.property('updatedAt')
  //         .that.is.a('string');
  //     });

  //     it('return object should have deliveredAt property', () => {
  //       expect(resBody).to.have.property('deliveredAt');
  //     });
  //   });

  //   context('Not valid input data', () => {
  //     const notValidInputData = {
  //       price: 'not-valid',
  //     };
  //     let resBody;

  //     before(async () => {
  //       resBody = await request.post('/api/orders')
  //         .set(headers)
  //         .send(notValidInputData)
  //         .expect(400)
  //         .then(getBody);

  //       return resBody;
  //     });

  //     it('should return object', () => {
  //       expect(resBody).to.be.an('object');
  //     });

  //     it('return object should have message property that is a string', () => {
  //       expect(resBody).to.have.property('message')
  //         .that.is.a('string')
  //         .that.equals('Validation error');
  //     });

  //     it('return object should have code property that is a number', () => {
  //       expect(resBody).to.have.property('code')
  //         .that.is.a('number');
  //     });

  //     it('return object should have info property that is a joi object', () => {
  //       expect(resBody).to.have.property('info')
  //         .that.is.a('object');
  //     });
  //   });
  // });

  // describe('POST /orders/:id/items', async () => {
  //   context('Valid input data', () => {
  //     let newOrderItem;
  //     let resBody;

  //     before(async () => {
  //       const { object: categoryObj } = await CategoryModel.createNew({
  //         name: 'test-category',
  //         description: 'test-category',
  //       });
  //       const { object: productObj } = await ProductModel.createNew({
  //         categoryId: categoryObj.id,
  //         name: 'test-product',
  //         description: 'test-product',
  //         producer: 'test-producer',
  //         producerCountry: 'test-producerCountry',
  //         code: 'test-code',
  //         portionNumber: 1337,
  //         portionWeight: 1,
  //         portionPrice: 1,
  //         boxType: 'test-boxType',
  //         boxWeight: 15,
  //         boxPrice: 1337,
  //       });
  //       newOrderItem = {
  //         productId: productObj.id,
  //         productNumber: 1,
  //         productPrice: 1337,
  //         itemPrice: 1337,
  //         productDiscount: 0,
  //       };
  //       resBody = await request.post(`/api/orders/${createdOrder.id}/items`)
  //         .set(headers)
  //         .send(newOrderItem)
  //         .expect(201)
  //         .then(getBody);

  //       return resBody;
  //     });

  //     it('should return object', () => {
  //       expect(resBody).to.be.an('object');
  //     });

  //     it('return object should have id property that is a number', () => {
  //       expect(resBody).to.have.property('id')
  //         .that.is.an('number');
  //     });

  //     it('return object should have productNumber property that is a number', () => {
  //       expect(resBody).to.have.property('productNumber')
  //         .that.is.a('number')
  //         .that.equals(newOrderItem.productNumber);
  //     });

  //     it('return object should have productPrice property that is a number', () => {
  //       expect(resBody).to.have.property('productPrice')
  //         .that.is.a('number')
  //         .that.equals(newOrderItem.productPrice);
  //     });

  //     it('return object should have itemPrice property that is a number', () => {
  //       expect(resBody).to.have.property('itemPrice')
  //         .that.is.a('number')
  //         .that.equals(newOrderItem.itemPrice);
  //     });

  //     it('return object should have productDiscount property that is a number', () => {
  //       expect(resBody).to.have.property('productDiscount')
  //         .that.is.a('number')
  //         .that.equals(newOrderItem.productDiscount);
  //     });

  //     it('return object should have orderId property that is a number', () => {
  //       expect(resBody).to.have.property('orderId')
  //         .that.is.a('number')
  //         .that.equals(createdOrder.id);
  //     });

  //     it('return object should have createdAt property that is a string', () => {
  //       expect(resBody).to.have.property('createdAt')
  //         .that.is.a('string');
  //     });

  //     it('return object should have updatedAt property that is a string', () => {
  //       expect(resBody).to.have.property('updatedAt')
  //         .that.is.a('string');
  //     });
  //   });

  //   context('Not valid input data', () => {
  //     const notValidInputData = {};
  //     let resBody;

  //     before(async () => {
  //       resBody = await request.post(`/api/orders/${createdOrder.id}/items`)
  //         .set(headers)
  //         .send(notValidInputData)
  //         .expect(400)
  //         .then(getBody);

  //       return resBody;
  //     });

  //     it('should return object', () => {
  //       expect(resBody).to.be.an('object');
  //     });

  //     it('return object should have message property that is a string', () => {
  //       expect(resBody).to.have.property('message')
  //         .that.is.an('string')
  //         .that.equals('Validation error');
  //     });

  //     it('return object should have code property that is a number', () => {
  //       expect(resBody).to.have.property('code')
  //         .that.is.an('number');
  //     });

  //     it('return object should have info property that is a joi object', () => {
  //       expect(resBody).to.have.property('info')
  //         .that.is.an('object');
  //     });
  //   });
  // });

  // describe('PUT /orders', async () => {
  //   context('Valid input data', () => {
  //     const updateData = {
  //       companyId: createdOrder.companyId,
  //       clientId: createdOrder.clientId,
  //       managerId: createdOrder.managerId,
  //       userId: createdOrder.userId,
  //       deliveryTimeMin: createdOrder.deliveryTimeMin,
  //       deliveryTimeMax: createdOrder.deliveryTimeMax,
  //       price: createdOrder.price,
  //       discount: createdOrder.discount,
  //       totalPrice: createdOrder.totalPrice,
  //       paymentMethod: 'non-cash',
  //       needDocuments: false,
  //       status: 'verified',
  //     };
  //     let resBody;

  //     before(async () => {
  //       resBody = await request.put(`/api/orders/${createdOrder.id}`)
  //         .set(headers)
  //         .send(updateData)
  //         .expect(200)
  //         .then(getBody);

  //       return resBody;
  //     });

  //     it('should return object', () => {
  //       expect(resBody).to.be.an('object');
  //     });

  //     it('return object should have id property that is a number', () => {
  //       expect(resBody).to.have.property('id')
  //         .that.is.a('number')
  //         .that.equals(createdOrder.id);
  //     });

  //     it('return object should have companyId property that is a number', () => {
  //       expect(resBody).to.have.property('companyId')
  //         .that.is.a('number')
  //         .that.equals(createdOrder.companyId);
  //     });

  //     it('return object should have legalPeopleId property that is a number', () => {
  //       expect(resBody).to.have.property('legalPeopleId')
  //         .that.is.a('number')
  //         .that.equals(createdOrder.legalPeopleId);
  //     });

  //     it('return object should have managerId property that is a number', () => {
  //       expect(resBody).to.have.property('managerId')
  //         .that.is.a('number')
  //         .that.equals(createdOrder.managerId);
  //     });

  //     it('return object should have clientId property that is a number', () => {
  //       expect(resBody).to.have.property('clientId')
  //         .that.is.a('number')
  //         .that.equals(createdOrder.clientId);
  //     });

  //     it('return object should have addressId property that is a number', () => {
  //       expect(resBody).to.have.property('addressId')
  //         .that.is.a('number')
  //         .that.equals(createdOrder.addressId);
  //     });

  //     it('return object should have paymentMethod property that is a string', () => {
  //       expect(resBody).to.have.property('paymentMethod')
  //         .that.is.a('string')
  //         .that.equals(updateData.paymentMethod);
  //     });

  //     it('return object should have needDocuments property that is a boolean', () => {
  //       expect(resBody).to.have.property('needDocuments')
  //         .that.is.a('boolean')
  //         .that.equals(updateData.needDocuments);
  //     });

  //     it('return object should have status property that is a string', () => {
  //       expect(resBody).to.have.property('status')
  //         .that.is.a('string')
  //         .that.equals(updateData.status);
  //     });

  //     it('return object should have deliveryDate property that is a string', () => {
  //       expect(resBody).to.have.property('deliveryDate')
  //         .that.is.a('string')
  //         .that.equals(createdOrder.deliveryDate);
  //     });

  //     it('return object should have deliveryTimeMin property that is a string', () => {
  //       expect(resBody).to.have.property('deliveryTimeMin')
  //         .that.is.a('string')
  //         .that.equals(createdOrder.deliveryTimeMin);
  //     });

  //     it('return object should have deliveryTimeMax property that is a string', () => {
  //       expect(resBody).to.have.property('deliveryTimeMax')
  //         .that.is.a('string')
  //         .that.equals(createdOrder.deliveryTimeMax);
  //     });

  //     it('return object should have comment property that is a string', () => {
  //       expect(resBody).to.have.property('comment')
  //         .that.is.a('string')
  //         .that.equals(createdOrder.comment);
  //     });

  //     it('return object should have price property that is a number', () => {
  //       expect(resBody).to.have.property('price')
  //         .that.is.a('number')
  //         .that.equals(createdOrder.price);
  //     });

  //     it('return object should have discount property that is a number', () => {
  //       expect(resBody).to.have.property('discount')
  //         .that.is.a('number')
  //         .that.equals(createdOrder.discount);
  //     });

  //     it('return object should have totalPrice property that is a number', () => {
  //       expect(resBody).to.have.property('totalPrice')
  //         .that.is.a('number')
  //         .that.equals(createdOrder.totalPrice);
  //     });

  //     it('return object should have userId property that is a number', () => {
  //       expect(resBody).to.have.property('userId')
  //         .that.is.a('number')
  //         .that.equals(createdOrder.userId);
  //     });

  //     it('return object should have createdAt property that is a string', () => {
  //       expect(resBody).to.have.property('createdAt')
  //         .that.is.a('string')
  //         .that.equals(createdOrder.createdAt);
  //     });

  //     it('return object should have updatedAt property that is a string', () => {
  //       expect(resBody).to.have.property('updatedAt')
  //         .that.is.a('string')
  //         .that.not.equal(createdOrder.updatedAt);
  //     });

  //     it('return object should have deliveredAt property', () => {
  //       expect(resBody).to.have.property('deliveredAt')
  //         .that.equals(createdOrder.deliveredAt);
  //     });
  //   });

  //   context('Not valid input data', () => {
  //     const updateData = {
  //       paymentMethod: 'test-invalid',
  //     };
  //     let resBody;

  //     before(async () => {
  //       resBody = await request.put(`/api/orders/${createdOrder.id}`)
  //         .set(headers)
  //         .send(updateData)
  //         .expect(400)
  //         .then(getBody);

  //       return resBody;
  //     });

  //     it('should return object', () => {
  //       expect(resBody).to.be.an('object');
  //     });

  //     it('return object should have message property that is a string', () => {
  //       expect(resBody).to.have.property('message')
  //         .that.is.a('string')
  //         .that.equals('Validation error');
  //     });

  //     it('return object should have code property that is a number', () => {
  //       expect(resBody).to.have.property('code')
  //         .that.is.a('number');
  //     });

  //     it('return object should have info property that is a joi object', () => {
  //       expect(resBody).to.have.property('info')
  //         .that.is.an('object');
  //     });
  //   });
  // });
});
