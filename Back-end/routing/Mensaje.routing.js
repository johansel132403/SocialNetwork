let express = require('express');
let router = express.Router();

let middle = require('../Middlewer/authentication');

let controller = require('../Controllers/mensaje.control');


router.post('/savemenssage',middle.Authentication,controller.saveMensaje);
router.get('/getownmensaje/:page?',middle.Authentication,controller.getMensajes);
router.get('/getsendm/:page?',middle.Authentication,controller.getSendMessage);
router.get('/getnoview',middle.Authentication,controller.getNoViewed);
router.put('/putview',middle.Authentication,controller.putViewPositive);

module.exports = router;