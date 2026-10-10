const { Router } = require('express');
const router = Router();

const productoCtrl = require('../controllers/producto.controller');

router.get('/', productoCtrl.getProductos);
router.post('/', productoCtrl.createProducto);
router.get('/:id', productoCtrl.getProducto);
router.put('/:id', productoCtrl.editProducto);
router.delete('/:id', productoCtrl.deleteProducto);

module.exports = router;