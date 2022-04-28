const {
    MessageEmbed
} = require('discord.js')
const errorembed2 = new MessageEmbed()
    .setColor(process.env.bot1Embed_Color)
    .setTitle("Error musica")
    .setDescription('<:error:897836005787308062> | Lavalink se encuentra fuera de servicio.')

const errorEmbedTemplate = new MessageEmbed()
    .setColor('RED')
    .setFooter({
        text: 'Some footer text here',
        iconURL: 'https://i.imgur.com/AfFp7pu.png'
    });

const webhook = require('../src/index')
const webhookClient = new webhook("https://canary.discord.com/api/webhooks/969137897062170644/GtarBHvJ1FSwrUIBKZIIvoCrs7A_SZjvPcXgYlGpA_jD-JrV-OGg4_ckIoNyKr7qP5GM")

describe('Recieves the interaction', () => {
    const t = () => {
        throw new Error("No has añadido datos a la template.");
    };
    // test('sends webhook with content', () => {
    //     webhookClient.send("a")
    // });
    // test('sends webhook with embed', () => {
    //     webhookClient.send(errorembed2)
    // });
    test('sends webhook with bad JSON', () => {
        webhookClient.send({
            "macarrones": "bien hechos"
        }).catch(err => {
            console.log('3')
        })
        // expect(() => {
        // }).toThrow('Embed no válido.')
    });
    // test('create a template', () => {
    //     webhookClient.createTemplate("warning", errorEmbedTemplate)
    // });
    // test('get a template', () => {
    //     webhookClient.send("a", "warning")
    // });
    // test('create a template', () => {
    //     expect(() => {
    //         webhookClient.createTemplate("warning")
    //     }).toThrow('No has añadido datos a la template.')
    // });
});