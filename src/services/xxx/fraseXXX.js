const fs = require('fs');
const path = require('path');

module.exports = class FraseAleatoria {

    static async responder(sessionName) {

        FraseAleatoria.data = FraseAleatoria.data || [];
       
        await fs.readFile('/var/www/www.api.marciodias.me/md-whatsapp-facil-api/src/services/xxx/storage/frases.txt', 'utf8', function(err, rawData) {
            if(err) {
                return console.log(err);
            }
            FraseAleatoria.data = rawData.toString().split('\n');
        });

        let frase = FraseAleatoria.data[FraseAleatoria.randomInt(1, FraseAleatoria.data.length)];
        
        while(frase===undefined) {
            frase = FraseAleatoria.data[FraseAleatoria.randomInt(1, FraseAleatoria.data.length)];
        }

        console.log('frase', frase);

        return String(frase).trim();
    }

    static randomInt(low,high) {
        return Math.floor(Math.random() * (high - low) + low);
    }

}