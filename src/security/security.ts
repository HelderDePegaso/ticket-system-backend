import * as crypto from 'crypto';


export const criptography = {
    crip: function (h) {
        let hashCode = crypto.createHash('sha256').update(h);
        return hashCode.digest('hex');
    }
}

export const UUIDV4 = () => crypto.randomUUID();