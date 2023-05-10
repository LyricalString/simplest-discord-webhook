import { EmbedBuilder } from 'discord.js'
import { describe, it } from 'node:test'
import Webhook from '../src/index.js'

const errorembed2 = new EmbedBuilder()
    .setColor(process.env.bot1Embed_Color)
    .setTitle('Error musica')
    .setDescription('<:error:897836005787308062> | Lavalink se encuentra fuera de servicio.')

const errorEmbedTemplate = new EmbedBuilder().setColor('RED').setFooter({
    text: 'Some footer text here',
    iconURL: 'https://i.imgur.com/AfFp7pu.png',
})

const webhookClient = new Webhook(
    'https://canary.discord.com/api/webhooks/969137897062170644/GtarBHvJ1FSwrUIBKZIIvoCrs7A_SZjvPcXgYlGpA_jD-JrV-OGg4_ckIoNyKr7qP5GM',
)

describe('Recieves the interaction', () => {
    // describe('webhook send messages', () => {
    //     it('sends webhook with content', () => {
    //         webhookClient.send("a")
    //     });
    //     it('sends webhook with embed', () => {
    //         webhookClient.send(errorembed2)
    //     });
    // })
    // describe('errors on webhooks', () => {
    //     it('throws an error if the json is not an embed', () => {
    //         webhookClient.send({
    //             "macarrones": "bien hechos"
    //         }).catch(e => {})
    //     });
    // })
    // describe('templates', () => {
    //     it('create a template', () => {
    //         webhookClient.createTemplate("warning", errorEmbedTemplate).catch(e => {
    //             console.log(e)
    //         })
    //     })
    // it('get a template', () => {
    //     webhookClient.send("a", "warning").catch(e => {})
    // });
    // })
    describe('templates errors', () => {
        // it('create a template', () => {
        //     expect(() => {
        //         webhookClient.createTemplate("warning").catch(e => {
        //             console.log(e)
        //         })
        //     }).toThrow('No has añadido datos a la plantilla.')
        // });
        // it('send a template with options', () => {
        // expect(() => {
        //     webhookClient
        //         .sendTemplate('warning', {
        //             title: 'a',
        //         })
        //         .catch(e => {
        //             console.log(e)
        //         })
        // })
        // })
    })
})
