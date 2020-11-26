const axios = require('axios');

module.exports = class DolarHoje {

    static async responder(message_param) {

        console.log(message_param.from.sender.pushname);

        const result = await axios.get('https://economia.awesomeapi.com.br/json/USD')
        .then(function(response){

            console.log('dolar sucesso', response);

            return response.data;
          console.log(response.data); // ex.: { user: 'Your User'}
          console.log(response.status); // ex.: 200
        })
        .catch(function(error) {
            return error;
        });  

        let message = 'A cotação de hoje do ' + result[0].name +' high: R$ ' + result[0].high + ' low: R$ ' + result[0].low;

        return message;
    }

}