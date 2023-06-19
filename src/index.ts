import templates, { createTemplate, preparePayload, posiblePayload } from './templates.js'
export { createTemplate }
import extend from 'just-extend'

export default class Webhook {
    #url = ''

    constructor(url: string) {
        this.#url = url
    }

    get templates() {
        return templates
    }

    get url() {
        return this.#url
    }

    static createTemplate = createTemplate

    async sendTemplate(template: string, options: posiblePayload) {
        if (typeof template !== 'string') throw new Error('template must be a string')
        if (!templates.has(template)) throw new Error('template not found')
        const parsedOptions = preparePayload(options)
        const res = await fetch(this.#url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(extend({}, templates.get(template), parsedOptions)),
        }).then(res => res.json())
        return res
    }

    async send(data: posiblePayload) {
        const res = fetch(this.#url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(preparePayload(data)),
        }).then(res => res.json())
        return res
    }
}
