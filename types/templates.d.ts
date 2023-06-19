import { EmbedBuilder, Message, RESTPostAPIWebhookWithTokenJSONBody, WebhookMessageCreateOptions } from 'discord.js';
declare const templates: Map<string, RESTPostAPIWebhookWithTokenJSONBody>;
export type posiblePayload = string | EmbedBuilder | (WebhookMessageCreateOptions & RESTPostAPIWebhookWithTokenJSONBody) | Message;
export type payload = {};
export declare function createTemplate(identifier: string, templateData: posiblePayload): void;
export declare function preparePayload(data: posiblePayload): RESTPostAPIWebhookWithTokenJSONBody;
export default templates;
