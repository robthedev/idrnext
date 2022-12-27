const fs = require('fs');

let trades = require('data/trades.json');

function uuid() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

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

const trade = {
    id, 
    title,
    bias,
    drRange,
    winLoss,
    maxStdTarget,
    entryZone,
    timeOfEntry,
    news,
};

function create({
    title,
    bias,
    drRange,
    winLoss,
    maxStdTarget,
    entryZone,
    timeOfEntry,
    news,
}) {
    const trade = {
        title,
        bias,
        drRange,
        winLoss,
        maxStdTarget,
        entryZone,
        timeOfEntry,
        news,
    };

       // generate new user id
       trade.id = trades.length ? uuid() : 1;

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

function update(id, { title, firstName, lastName, email, role, password }) {
    const params = { title, firstName, lastName, email, role, password };
    const user = trades.find(x => x.id.toString() === id.toString());

    // validate
    if (params.email !== user.email && trades.find(x => x.email === params.email))
        throw `User with the email ${params.email} already exists`;

    // only update password if entered
    if (!params.password) {
        delete params.password;
    }

    // set date updated
    user.dateUpdated = new Date().toISOString();

    // update and save
    Object.assign(user, params);
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