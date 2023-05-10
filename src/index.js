import { fileURLToPath } from 'url'
import templates, { createTemplate, preparePayload } from './templates.js'
export { createTemplate }
import extend from 'just-extend'

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

    async sendTemplate(template, options = {}) {
        if (typeof template !== 'string') throw new Error('template must be a string')
        if (!templates[template]) throw new Error('template not found')
        options = preparePayload(options)
        const res = await fetch(this.#url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(extend({}, templates[template], options)),
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
