import { AxiosResponse } from 'axios'
import { MessageEmbed } from 'discord.js'
declare class webhook {
    url: string
    payload: { content: string } | { embeds: [Partial<MessageEmbed>] }
    templates: { [key: string]: Partial<MessageEmbed>[] }
    constructor(url: string)
    checkFieldValueLength(value: Partial<MessageEmbed>): void
    checkData(data: Partial<MessageEmbed> | string): Promise<void>
    preparePayload(
        data: Partial<MessageEmbed> | string
    ): Promise<{ content: string } | { embeds: [Partial<MessageEmbed>] }>
    createTemplate(identifier: string, templateData: Partial<MessageEmbed>): Promise<void>
    getTemplates(): Promise<Partial<MessageEmbed>>
    getSingleTemplate(identifier: string): Promise<Partial<MessageEmbed>>
    sendTemplate(template: string, options?: { title: string }): Promise<AxiosResponse>
    send(data: Partial<MessageEmbed> | string, template?: string): Promise<AxiosResponse>
}

export default webhook
