const fs = require('fs');
const path = require('path');

module.exports = class DiasDeTruta {

    static async responder(message_from) {

        FraseAleatoria.ddt = FraseAleatoria.ddt || [];
       
        await fs.readFile('/var/www/www.api.marciodias.me/md-whatsapp-facil-api/src/services/xxx/storage/ddt.txt', 'utf8', function(err, rawData) {
            if(err) {
                return console.log(err);
            }
            FraseAleatoria.ddt = rawData.toString().split('\n');
        });

        let frase = FraseAleatoria.ddt[FraseAleatoria.randomInt(1, FraseAleatoria.ddt.length)];
        
        if(!frase || !frase === undefined) {
            frase = FraseAleatoria.ddt[FraseAleatoria.randomInt(1, FraseAleatoria.ddt.length)];
        }

        console.log('frase', frase);

        return String(frase).trim();
    }
    
  
    static randomInt(low,high) {
        return Math.floor(Math.random() * (high - low) + low);
    }

}