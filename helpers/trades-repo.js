const fs = require('fs');

let trades = require('data/trades.json');

export const tradesRepo = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

function getAll() {
    return trades;
}

function getById(id) {
    return trades.find(x => x.id.toString() === id.toString());
}

function create(data) {

    const trade = data;
       // generate new id
       trade.id = Math.random() * 100;

    // validate
    if (trades.find(x => x.id === trade.id))
        throw `${trade.id} already exists`;

    // set date created and updated
    trade.dateCreated = new Date().toISOString();
    trade.dateUpdated = new Date().toISOString();

    // add and save user
    trades.push(trade);
    saveData();
}

function update(id, data) {
    const trade = trades.find(x => x.id.toString() === id.toString());

    // set date updated
    trade.dateUpdated = new Date().toISOString();

    // update and save
    Object.assign(trade, data);
    saveData();
}

// prefixed with underscore '_' because 'delete' is a reserved word in javascript
function _delete(id) {
    // filter out deleted user and save
    trades = trades.filter(x => x.id.toString() !== id.toString());
    saveData();
    
}

// private helper functions

function saveData() {
    fs.writeFileSync('data/trades.json', JSON.stringify(trades, null, 4));
}