var Router = require('koa-router');

var twil = require('../modules/twilio');

const config = require('../config');

var router = Router({
    prefix: '/data'
});

/*gets data*/
router.get(`/`, async(cnx, next) => { 
    try{
        const body = cnx.request.body;
        
        const link = cnx.request.link;
        const price = cnx.request.price;

        const phone = body.phone;//phone
        const message = `
            Sending house...
            Link: ` + link + `
            Price: ` + price +`
        `//message to send

        await twil.send(phone, message);// send message

        cnx.body = {message: 'Sent okay'};//response
        cnx.response.status = 200;//a-o-kay
    }catch(error){
        cnx.response.status = error.status || 400;
        cnx.body = {message:error.message};
    }
});

module.exports = router;