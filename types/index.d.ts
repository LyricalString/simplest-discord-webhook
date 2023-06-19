import { createTemplate, posiblePayload } from './templates.js';
export { createTemplate };
export default class Webhook {
    #private;
    constructor(url: string);
    get templates(): Map<string, import("discord.js").RESTPostAPIWebhookWithTokenJSONBody>;
    get url(): string;
    static createTemplate: typeof createTemplate;
    sendTemplate(template: string, options: posiblePayload): Promise<any>;
    send(data: posiblePayload): Promise<any>;
}
