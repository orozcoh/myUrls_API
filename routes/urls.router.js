const express = require('express');
//const validatorHandler = require('../middlewares/validator.handler');
const UrlsService = require("../services/urls.service");
//const { createProductSchema, updateProductSchema, getProductSchema } = require("../schemas/product.schema");

const router = express.Router();
router.use(express.json());
const urls_service = new UrlsService();

// -------------------------------------------------------------------------------------
// --------------------------------------- GET -----------------------------------------

router.get('/', async (req,res) => {
  const urls = await urls_service.getUrls();
  res.json(urls);
});

router.get('/get-all', async (req,res) => {
  const url_list = await urls_service.getAllUrls();
  res.json(url_list);
});

router.get('/:id', async (req,res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const product = await urls_service.getOneUrl(parseInt(id));  //parseInt(id)
    if (product === -1){
    res.status(404).json({message: "URL not found", id: id});
    }
    else{
    res.status(200).json(product);
    }
  } catch (error) {
    console.log("error");
      next(error);
  }
});
// ------------------------------------------------------------------------------------
// -------------------------------------- POST ----------------------------------------

router.post('/', async (req, res) => {
    const body  = req.body;
    const newProd = await urls_service.create(body);

    res.status(201).json(newProd);
});
// -------------------------------------------------------------------------------------
// ------------------------------------- DELETE ----------------------------------------

router.delete('/:id', async (req,res) => {
  const { id } = req.params;
  const prodDel = await urls_service.delete(parseInt(id));

  if (prodDel === -1){
    res.status(404).json({
      message : "URL not found",
      product: id
    });
  }else {
    res.json({
      message : "URL deleted",
      product: prodDel
    });
  }
});
// -------------------------------------------------------------------------------------
// -------------------------------------- PATCH ----------------------------------------

router.patch('/:id',async (req,res) => {
  const { id } = req.params;
  const body = req.body;
  const prod = await urls_service.update(parseInt(id), body);
  if (prod === -1){
    res.status(404).json({message: "Product not found", id: id});
  } else {
    res.json(prod);
  }
});
// -------------------------------------------------------------------------------------

module.exports = router;