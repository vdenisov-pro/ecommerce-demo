/**
* @api {OBJECT} Address   TYPE for address
*
* @apiName IAddress
* @apiGroup Type
* @apiVersion 0.0.1
*
* @apiParam {String} country        Address country (required).
* @apiParam {String} city           Address city (required).
* @apiParam {String} street         Address street (required).
* @apiParam {String} house          Address house (required).
* @apiParam {String} [courierId]    Courier ID (optional).
*/

/**
* @api {OBJECT} LegalPerson   TYPE for legal person
*
* @apiName ILegalPerson
* @apiGroup Type
* @apiVersion 0.0.1
*
* @apiParam {String} type   Type for legal person (required).
* @apiParam {String} name   Name for lergal person (required).
*/

/**
* @api {OBJECT} OrderItem   TYPE for order item
*
* @apiName IOrderItem
* @apiGroup Type
* @apiVersion 0.0.1
*
* @apiParam {Number} productId        Product ID (required).
* @apiParam {Number} productNumber    Product number (required).
* @apiParam {Double} productPrice     Product price (required).
* @apiParam {Double} itemPrice        Item price (required).
*/
