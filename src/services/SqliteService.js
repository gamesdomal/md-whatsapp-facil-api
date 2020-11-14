const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

require('dotenv/config');

module.exports = class Sqlite {

    static async createDatabase() {

        try {
            const db = await sqlite.open({ filename: './database.sqlite', driver: sqlite3.Database });
        
            await db.run(`create table if not exists votes (id integer primary key, name text, whatsapp_id text, hits integer)`);
        
            // await db.run('insert into people (name) values (?)', ['Gabriel']);
        
            // const rows = await db.all('select * from people');
            // console.log(rows);
        
            await db.close();
          } catch (error) {
            console.log(error);
          }
    }

    static async registerVote(message) {

        try {
            const db = await sqlite.open({ filename: './database.sqlite', driver: sqlite3.Database });
            
            // const rows = await db.all('select * from votes WHERE whatsapp_id = ${message.sends.id}');
            const whatsapp_id = await db.get('SELECT * FROM votes WHERE whatsapp_id = ?', [message.sender.id]);
            
            if(!whatsapp_id) {
              await db.run('insert into votes (name, whatsapp_id, hits) values (?, ?, ?)', [message.sender.id, message.sender.pushname, hits]);
              const whatsapp_id = await db.get('SELECT * FROM votes WHERE whatsapp_id = ?', [message.sender.id]);
            } 
            
            const result = await db.run(
              'UPDATE votes SET hits = ? WHERE whatsapp_id = ?',
              whatsapp_id.hits++,
              whatsapp_id.whatsapp_id
            );
            await db.close();

            return result;
          } catch (error) {
            console.log(error);
          }
    }

}