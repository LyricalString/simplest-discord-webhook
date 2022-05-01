const {
    default: axios
} = require('axios');
const fs = require('fs')
const path = require('path')

module.exports = class webhook {
    constructor(url) {
        this.url = url;
        this.payload;
        this.templates = this.getTemplates().catch(e => {
            throw new Error(e)
        });
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
                        checks.push(this.checkFieldValueLength(data.fields[i].value));
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
        const dir = path.join(__dirname, `../config/${identifier}.json`)
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
            let fileData
            fs.readdirSync(path.join(__dirname, '../config')).forEach(file => {
                let rawfileData = fs.readFileSync(path.join(__dirname, `../config/${file}`))
                if (!rawfileData) reject(`El archivo ${file} está vacío.`)
                try {
                    fileData = JSON.parse(rawfileData)
                } catch (e) {
                    reject(`El archivo ${file} está vacío.`)
                }
                this.templates[file.split('.')[0]] = fileData
            })
            resolve(this.templates)
        })
    }

    getSingleTemplate(identifier) {
        return new Promise((resolve, reject) => {
            let fileData
            const dir = path.join(__dirname, `../config/${identifier}.json`)
            let file = fs.readFileSync(dir)
            if (!file) reject("El archivo de la plantilla no se ha encontrado.")
            try {
                fileData = JSON.parse(file)
            } catch (e) {
                reject(`El archivo ${file} está vacío.`)
            }
            resolve(fileData)
        })
    }

    sendTemplate(template, options) {
        console.log('1')
        return new Promise((resolve, reject) => {
            try {
                if (template) {
                    let embed = this.getSingleTemplate(template)[0].catch(e => {
                        throw new Error(e)
                    })
                    console.log(embed)
                    if (options) {
                        if (options.title) embed.title = options.title
                    }
                    axios.post(this.url, {
                            embeds: [embed]
                        })
                        .then(res => resolve(res))
                        .catch(err => reject(err))
                } else {
                    throw new Error('La plantilla no existe.')
                }
            } catch (e) {
                console.log(e)
            }
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
                        let embed = this.getSingleTemplate(template).catch(e => {
                            throw new Error(e)
                        })
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