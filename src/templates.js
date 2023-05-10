import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const templates = new Map()

export function createTemplate(identifier, templateData) {
    if (!templateData) throw new Error("Don't have added data to the template.")
    const dir = join(__dirname, '..', 'config', `${identifier}.json`)
    templates.set(identifier, preparePayload(templateData))
    writeFileSync(dir, JSON.stringify(templates.get(identifier)))
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
        templates.set(file.split('.')[0], readFileSync(join(__dirname, '..', 'config', file)).toJSON())
    } catch {}
})

export default templates
