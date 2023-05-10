// @ts-check
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'url'
import templates, { createTemplate } from './templates.js'
export { createTemplate }

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default class Webhook {
    #url = ''

    constructor(url) {
        this.#url = url
    }

    get templates() {
        return templates
    }

    get url() {
        return this.#url
    }

    static createTemplate = createTemplate

    async sendTemplate(template) {
        if (typeof template !== 'string') throw new Error('template must be a string')
        if (!templates[template]) throw new Error('template not found')
        const res = await fetch(this.#url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(templates[template]),
        }).then(res => res.json())
        return res
    }

    async send(data) {
        const res = fetch(this.#url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(res => res.json())
        return res
    }
}
