let express = require('express');

let  controller = require('../Controllers/Follow.control');

let middlewer = require('../Middlewer/authentication');
let routing = express.Router();


routing.post('/saveFollow/:followingUs',middlewer.Authentication,controller.sevaFollow);
routing.delete('/deleteFollow/:id',middlewer.Authentication,controller.deleteFollow);
routing.get('/getFollow/:id?/:page?',middlewer.Authentication,controller.getFollowers);
routing.get('/getUsFollow/:id?/:page?',middlewer.Authentication,controller.getUsFollow);
routing.get('/getOnlyFollow/:follow?',middlewer.Authentication,controller.getFollowWithOutPag);

module.exports = routing;