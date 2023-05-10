import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'url'
import {
    AllowedMentionsTypes,
    EmbedBuilder,
    Message,
    RESTPostAPIWebhookWithTokenJSONBody,
    WebhookMessageCreateOptions,
} from 'discord.js'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const templates = new Map()

export type posiblePayload =
    | string
    | EmbedBuilder
    | (WebhookMessageCreateOptions & RESTPostAPIWebhookWithTokenJSONBody)
    | Message
export type payload = {}

export function createTemplate(identifier: string, templateData: posiblePayload) {
    if (!templateData) throw new Error("Don't have added data to the template.")
    const dir = join(__dirname, '..', 'config', `${identifier}.json`)
    templates.set(identifier, preparePayload(templateData))
    writeFileSync(dir, JSON.stringify(templates.get(identifier)))
}

export function preparePayload(data: posiblePayload): RESTPostAPIWebhookWithTokenJSONBody {
    if (typeof data === 'string')
        return {
            content: data,
        }
    else if (data instanceof EmbedBuilder)
        return {
            embeds: [data.toJSON()],
        }
    else if (data instanceof Message)
        return {
            content: data.content,
            avatar_url: data.author.avatarURL() ?? '',
            username: data.author.username,
            embeds: data.embeds.map(embed => embed.toJSON()),
            tts: data.tts,
            components: data.components.map(component => component.toJSON()),
        }
    else if (typeof data === 'object') {
        return {
            content: data.content,
            avatar_url: data.avatarURL ?? data.avatar_url,
            username: data.username,
            embeds: data.embeds?.map(embed => JSON.parse(JSON.stringify(embed))) ?? [],
            tts: data.tts,
            allowed_mentions: {
                replied_user: !!data.allowedMentions?.repliedUser ?? !!data.allowed_mentions?.replied_user,
                users: data.allowedMentions?.users ?? data.allowed_mentions?.users ?? [],
                roles: data.allowedMentions?.roles ?? data.allowed_mentions?.roles ?? [],
                parse:
                    (data.allowedMentions?.parse as unknown as AllowedMentionsTypes[]) ??
                    data.allowed_mentions?.parse ??
                    [],
            },
        }
    } else throw new Error('[simplest-discord-webhook] invalid data')
}

readdirSync(join(__dirname, '../config')).map(file => {
    try {
        templates.set(file.split('.')[0], readFileSync(join(__dirname, '..', 'config', file)).toJSON())
    } catch {}
})

export default templates
