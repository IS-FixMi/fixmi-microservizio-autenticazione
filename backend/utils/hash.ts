let crypto = require('crypto');

export function hash_pass(password: String): String{
    return crypto.createHash("sha256").update(password).copy().digest('hex')
}