![version](https://img.shields.io/npm/v/simplest-discord-webhook "Version")
![npm](https://img.shields.io/npm/dt/simplest-discord-webhook.svg "Total Downloads")

- [Installation](#installation)
- [Examples](#examples)
    - [Basic use](#basic-use)
    - [Custom embeds](#custom-embeds)
- [Notes](#notes)
- [License](#license)

# Important
This is my first package and I'm working on it, if you find any error or suggestion, send me a message to LyricalString#5222 ;)

# Installation
```npm install simplest-discord-webhook```


# Examples

## Basic use
```js
const Webhook = require('simplest-discord-webhook');
const hook = new Webhook("YOUR WEBHOOK URL");

hook.send('MESSAGE');
```

## Custom embeds
```js
const Webhook = require('simplest-discord-webhook');
const { MessageBuilder } = require('discord.js')
const hook = new Webhook("YOUR WEBHOOK URL");

const embed = new MessageBuilder()
.setTitle('My title here')
.setAuthor('Author here', 'https://cdn.discordapp.com/embed/avatars/0.png', 'https://www.google.com')
.setURL('https://www.google.com')
.addField('First field', 'this is inline', true)
.addField('Second field', 'this is not inline')
.setColor('#00b0f4')
.setThumbnail('https://cdn.discordapp.com/embed/avatars/0.png')
.setDescription('Oh look a description :)')
.setImage('https://cdn.discordapp.com/embed/avatars/0.png')
.setFooter('Hey its a footer', 'https://cdn.discordapp.com/embed/avatars/0.png')
.setTimestamp();

hook.send(embed);
```

This is an example with the full embed, but you can send less information on the embed :)```


# Notes
simplest-discord-webhook is a promise based library, which means you can use `.catch`, `.then`, and `await`. For example:

```js
const Webhook = require('simplest-discord-webhook');
const hook = new Webhook("YOUR WEBHOOK URL");

hook.send("Hello there!")
.then(() => console.log('Sent webhook successfully!'))
.catch(err => console.log(err.message));
```

or using async:
```js
const Webhook = require('simplest-discord-webhook');
const hook = new Webhook("YOUR WEBHOOK URL");

(async () => {
    try {
        await hook.send('Hello there!');
        console.log('Successfully sent webhook!');
    }
    catch(e){
        console.log(e.message);
    };
})();
```

# License

MIT