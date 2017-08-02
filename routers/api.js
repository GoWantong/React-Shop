const express = require('express');

const Commodity = require('../models/commodity');
const Cart = require('../models/cart');

const router = express.Router();

router.get('/goods', function (req, res, next) {
  Commodity.find(function (err, commodities) {
    if (err) {
      res.send('error');
    }
    res.json(commodities);
  });
});


// 获取某个用户的购物车内容
router.get('/cart', function (req, res, next) {
  const userId = parseInt(req.query.userId, 10);
  let commodities = [];
  Cart.findOne({user_id: userId}, function(err, cart) {
    if (err) {
      console.log(err);
    }
    console.log(cart.goods);
    if (cart && cart.goods) {
      for (commodity of cart.goods) {
        const quantity = commodity.quantity;
        Commodity.findOne({ commodity_id: commodity.commodity_id }, function(err, commodity) {
          if (err) {
            console.log(err);
          }
          // console.log(`commodity: ${commodity}`);
          const cartCommodity = Object.assign(commodity,{"quantity":quantity});
          console.log(cartCommodity.quantity);
          commodities.push(cartCommodity);
          // console.log(commodities.length);
        }).exec(function(){
          console.log(commodities[0].quantity);
          console.log(commodities[0]);
          // TODO: bug!!
          res.json(commodities);
        });
      }
    } else {
      res.json([]);
    }
  });
});

// 用户向购物车添加商品，或修改购物车内容
router.post('/cart', function(req, res, next) {
  const user_id = parseInt(req.body.userId, 10);
  const commodity_id = parseInt(req.body.commodityId, 10);
  const quantity = parseInt(req.body.quantity, 10);
  console.log(`user_id: ${user_id}  commodity_id: ${commodity_id} quantity: ${quantity}`);
  if (user_id && commodity_id && quantity) {
    Cart.update({ user_id: user_id },{
      "$addToSet":{"goods":{ "commodity_id": commodity_id, "quantity": quantity }}
    }).exec(function(){
      res.json({ success: 1 });
    });
  }
});

module.exports = router;