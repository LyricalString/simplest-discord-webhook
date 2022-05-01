const {
    MessageEmbed
} = require('discord.js')
const webhook = require('dist/index.js')
const webhookClient = new webhook("https://canary.discord.com/api/webhooks/969137897062170644/GtarBHvJ1FSwrUIBKZIIvoCrs7A_SZjvPcXgYlGpA_jD-JrV-OGg4_ckIoNyKr7qP5GM")


const errorEmbedTemplate = new MessageEmbed()
    .setColor('RED')
    .setFooter({
        text: 'Ha ocurrido un error',
        iconURL: 'https://i.imgur.com/AfFp7pu.png'
    });


webhookClient.send(errorEmbedTemplate).then(res => {
    console.log(res)
}).catch(e => {
    console.log(e)
})