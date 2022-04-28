const {
    default: axios
} = require('axios');
const fs = require('fs')

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
        if (!data || (data.type && data.type != "rich")) return new Promise((resolve) => resolve());
        if (typeof (data) == 'string') return new Promise((resolve) => resolve());
        if (data.fields) {
            if (data.fields == []) {
                return new Promise((resolve) => resolve());
            } else {
                return new Promise((resolve, reject) => {
                    const checks = [];

                    for (let i = 0; i < data.fields.length; i++) {
                        checks.push(this.checkFieldValueLength(this.payload.fields[i].value));
                    }

                    Promise.all(checks).then(() => {
                        resolve();
                    })
                });
            }
        } else {
            return new Promise(() => {
                throw new Error("Embed no válido.")
            });
        }

    }

    preparePayload(data) {
        return new Promise((resolve, reject) => {
            this.checkData(data).catch(err => {
                console.log(err)
                throw new Error(err)
            })
            if (typeof (data) != 'object') {
                resolve(this.payload = {
                    content: data
                })
            } else {
                resolve(this.payload = {
                    embeds: [data]
                })

            }
        })
    }

    createTemplate(identifier, rawTemplateData) {
        const dir = `./config/${identifier}.json`
        if (!rawTemplateData) throw new Error('No has añadido datos a la template.')
        return new Promise((resolve, reject) => {
            fs.writeFile(dir, JSON.stringify([rawTemplateData], null, 2), (err, data) => {
                if (err) reject(err)
            })
            resolve()
        })
    }

    getTemplate(identifier) {
        const dir = `./config/${identifier}.json`
        return JSON.parse(fs.readFileSync(dir))
    }

    send(data, template) {
        return new Promise((resolve, reject) => {
            if (template) {
                this.preparePayload(data).catch(err => {
                    throw new Error(err)
                })
                let embed = this.getTemplate(template)
                axios.post(this.url, {
                        embeds: [embed[0]]
                    })
                    .then(res => resolve(res))
                    .catch(err => reject(err))
            } else {
                this.preparePayload(data).catch(err => {
                    throw new Error(err)
                })
                axios.post(this.url, this.payload)
                    .then(res => resolve(res))
                    .catch(err => reject(err))
            }
        })
    }
}