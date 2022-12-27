import { AxiosResponse } from 'axios'
import { MessageEmbed } from 'discord.js'
export default interface webhook {
    url: string
    payload: { content: string } | { embeds: [MessageEmbed] }
    templates: { [key: string]: MessageEmbed[] }
    constructor(url: string): this
    checkFieldValueLength(value: MessageEmbed): void
    checkData(data: MessageEmbed | string): Promise<void>
    preparePayload(data: MessageEmbed | string): Promise<{ content: string } | { embeds: [MessageEmbed] }>
    createTemplate(identifier: string, templateData: MessageEmbed): Promise<void>
    getTemplates(): Promise<MessageEmbed>
    getSingleTemplate(identifier: string): Promise<MessageEmbed>
    sendTemplate(template: string, options?: { title: string }): Promise<AxiosResponse>
    send(data: MessageEmbed | string, template?: string): Promise<AxiosResponse>
}
