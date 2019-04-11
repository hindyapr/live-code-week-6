const bcrypt = require('bcryptjs');


function encode(pass) {
    return bcrypt.hashSync(pass, 9);
}

function decode(pass, hash) {
    return bcrypt.compareSync(pass, hash);
}

module.exports = { encode, decode };