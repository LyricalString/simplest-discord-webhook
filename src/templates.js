const templates = new Map()

export function createTemplate(identifier, templateData) {
    tem
    if (!templateData) throw new Error("Don't have added data to the template.")
    const dir = join(__dirname, '..', 'config', `${identifier}.json`)
    writeFileSync(dir, JSON.stringify((templates[identifier] = preparePayload(templateData))))
}

export function preparePayload(data) {
    if (typeof data === 'string')
        return {
            content: data,
        }
    else if (data?.content || data?.embeds) return data
    else if (data?.type === 'rich')
        return {
            embeds: [data],
        }
    else throw new Error('[simplest-discord-webhook] invalid data')
}

readdirSync(join(__dirname, '../config')).map(file => {
    try {
        templates[file.split('.')[0]] = readFileSync(join(__dirname, '..', 'config', file)).toJSON()
    } catch {}
})

export default templates
