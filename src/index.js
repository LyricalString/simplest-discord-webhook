const {
    default: axios
} = require('axios');
const fs = require('fs')

module.exports = class webhook {
    constructor(url) {
        this.url = url;
        this.payload;
        this.templates = this.getTemplates();
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
                return new Promise((resolve) => {
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
            throw new Error('Embed no válido')
        }
    }

    preparePayload(data) {
        return new Promise((resolve, reject) => {
            try {
                this.checkData(data).catch(e => {
                    reject(e)
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
            } catch (e) {
                reject(e)
            }
        })
    }

    createTemplate(identifier, templateData) {
        const dir = `./config/${identifier}.json`
        if (!templateData) throw new Error('No has añadido datos a la plantilla.')
        return new Promise((resolve, reject) => {
            fs.writeFile(dir, JSON.stringify([templateData], null, 2), (err, data) => {
                if (err) reject(err)
            })
            this.templates[identifier] = templateData
            resolve()
        })
    }

    getTemplates() {
        return new Promise((resolve, reject) => {
            this.templates = []
            fs.readdirSync('./config').forEach(file => {
                let fileData = fs.readFileSync(`./config/${file}`)
                this.templates[file.split('.')[0]] = JSON.parse(fileData)
            })
            resolve(this.templates)
        })
    }

    getSingleTemplate(identifier) {
        return new Promise((resolve, reject) => {
            const dir = `./config/${identifier}.json`
            let file = fs.readFileSync(dir)
            if (!file) reject("El archivo de la plantilla no se ha encontrado.")
            resolve(JSON.parse(file))
        })
    }

    send(data, template) {
        return new Promise((resolve, reject) => {
            try {
                if (template) {
                    this.preparePayload(data)
                    if (this.templates[template]) {
                        axios.post(this.url, {
                                embeds: [this.templates[template]]
                            })
                            .then(res => resolve(res))
                            .catch(err => reject(err))
                    } else {
                        let embed = this.getSingleTemplate(template)
                        axios.post(this.url, {
                                embeds: [embed[0]]
                            })
                            .then(res => resolve(res))
                            .catch(err => reject(err))
                    }
                } else {
                    this.preparePayload(data).catch(e => {
                        reject(e)
                    })
                    axios.post(this.url, this.payload)
                        .then(res => resolve(res))
                        .catch(err => reject(err))
                }
            } catch (e) {
                console.log(e)
            }
        })
    }
}