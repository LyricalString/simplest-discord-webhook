const {
    default: axios
} = require('axios');

module.exports = class webhook {
    constructor(url) {
        this.url = url;
        this.payload;
    }

    checkFieldValueLength(value) {
        if (value.length > 1024)
            throw new Error(`El valor se compone por ${value.length} carácteres, los campos de Embed de Discord permiten como máximo 1024.`);
    }

    checkData(data) {
        if (!data) return new Promise((resolve) => resolve());

        if (data.fields == []) return new Promise((resolve) => resolve());

        return new Promise((resolve) => {
            const checks = [];

            for (let i = 0; i < data.fields.length; i++) {
                checks.push(this.checkFieldValueLength(payload.fields[i].value));
            }

            Promise.all(checks).then(() => {
                resolve();
            });
        });
    }

    preparePayload(data) {
        this.checkData(data)
        if (typeof (data) == 'string') return this.payload = {
            content: data
        }
        this.payload = {
            embeds: [data]
        }
    }

    send(data) {
        this.preparePayload(data)

        axios.post(this.url, this.payload).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }
}