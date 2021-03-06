const axios = require('axios');

require('dotenv/config');

module.exports = class Sessions {

    static async notifyApiSessionUpdate(session) {

        let url = process.env.API_WEBHOOK_URL+'/session/status';

        if(session.name && process.env.API_WEBHOOK) {
            console.log('Disparando Webhook para ',url);
            const response = await axios.post(url, session)  
            .then(function(response){
                console.log('Webhook enviado com sucesso!');
                console.log(`Disparado Webhook para ${url}, response: ${response}`);
            }).catch(e => console.log(e));
            return response;
        }
    }

}