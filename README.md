# WhatsApp Fácil - Free Open Source WhatsApp Api

Este projeto usa como base o [Venom-bot](https://github.com/orkestral/venom), um navegador virtual sem interface gráfica que abre o whatsapp web e executa todos os comandos via código possibilitando assim a automação de todas as funções, o projeto é um fork da [myzap](https://github.com/billbarsch/myzap).

## Setup

`sudo apt install -y gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget build-essential apt-transport-https libgbm-dev`
- para instalar todas as dependencias necessárias no sistema

`curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -`

`sudo apt install git nodejs yarn`
- para instalar git, nodejs e yarn

`git clone https://github.com/marciodiasdeveloper/md-whatsapp-facil-api.git`

`cd md-whatsapp-facil-api`

`npm install`

`cp .env-example .env`

### Start server

`node src/server.js`

### keep processes alive at every server restart

`npm install pm2 -g`

`pm2 start src/server.js`

`pm2 startup`

## Usage

### Start new whatsapp session

`http://localhost:3334/start?sessionName=session1`

### Get QRCode (quickly!!)

`http://localhost:3334/qrcode?sessionName=session1&image=true`
- png

`http://localhost:3334/qrcode?sessionName=session1`
- json (base64)

### Send message (POST method)

```javascript
(async () => {
  const response = await fetch('http://localhost:3334/sendText', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
        {
            sessionName: "session1", 
            number: '556334140378',
            text:"Hello\nWorld"
        }
    )
  });
  const content = await response.json();

  console.log(content);
})();  
```

### Send File (POST method)

```javascript
(async () => {
    const response = await fetch('http://localhost:3334/sendFile', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
        {
            sessionName: "session1", 
            number: '556334140378',
            base64Data:"44696d61", //hexadecimal
            fileName:"test.txt",
            caption: "Document" //optional
        }
    )
  });
  const content = await response.json();

  console.log(content);
})();  
```

### Close whatsapp session

`http://localhost:3334/close?sessionName=session1`


## To install certbot and create ssl certificate to https domains:

`sudo apt-get update && sudo apt-get install -y software-properties-common`

`sudo add-apt-repository universe && sudo add-apt-repository ppa:certbot/certbot`

`sudo apt-get update && sudo apt-get install -y certbot`

`sudo certbot certonly --manual --force-renewal -d *.yourdomain.net -d yourdomain.net --agree-tos --no-bootstrap --manual-public-ip-logging-ok --preferred-challenges dns-01 --server https://acme-v02.api.letsencrypt.org/directory`