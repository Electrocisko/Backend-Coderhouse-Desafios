import knex from 'knex';

const sqliteOptions = {
    client: 'sqlite3',
    connection: {
        filename: './src/database/ecommerce_products.sqlite'
    },
    useNullAsDefault: true
};

let db = knex(sqliteOptions);
try {
    let exist = await db.schema.hasTable('products');
    if(exist){
        await db('products').delete();
    }
    else {
        await db.schema.createTable('products',table => {
            table.primary('id');
            table.increments('id');
            table.string('title',30);
            table.float('price');  
            table.string('thumbnail');
        })
    }
} catch (error) {
    console.log(error)
};

try {
    let exist = await db.schema.hasTable('chats');
    if(exist){
        await db('chats').delete();
    }
    else {
        await db.schema.createTable('chats',table => {
            table.string('user',30);
            table.string('time',30);  
            table.string('mensaje',50);
        })
    }
} catch (error) {
    console.log(error)
}

export default db;


