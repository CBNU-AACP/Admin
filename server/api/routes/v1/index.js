const {Router} = require('express');
const router = Router();
const {readdirSync} = require('fs');
const {join} = require('path');

readdirSync(join(__dirname), {withFileTypes: true}).forEach(p => {
    if(p.isDirectory()) {
      const route = require(join(__dirname, p.name));
      router.use(`/${p.name}`, route);
    }
});

module.exports = router;