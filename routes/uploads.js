const express = require('express');
const router = express.Router();
const verify = require('./auth/verifyToken');
const getData = require('../data');

const Client = require('ftp');
 
let c = new Client();
c.on('ready', function() {
  
});
// connect to localhost:21 as anonymous
c.connect({
        host: "ftpupload.net",
        user: "epiz_26092518",
        password: "1xzkMfyxilj9",
        secure: false
    }
);


router.get('/projectCovers/:image', async (req, res) => {
    console.log(req.params.image);
    c.get('htdocs/uploads/projectCovers/' + req.params.image , function(err, stream) {
        if (err) {
            console.log(err);
            return res.status(err.code).redirect('/images/no-image.png');
        };

        stream.pipe(res);
    });

});

module.exports = router;