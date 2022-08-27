const { default: makeWASocket, Browsers, AnyMessageContent, delay, proto, generateWAMessageFromContent, DisconnectReason, fetchLatestBaileysVersion, useSingleFileAuthState } = require('@adiwajshing/baileys');
const fs = require('fs');
const P = require ('pino');
const { exec } = require("child_process")
const { Boom } = require('@hapi/boom')
const chalkanim = require('chalk-animation');
const package = require('./package.json');
const CFonts = require('cfonts');
const { state, saveState } = useSingleFileAuthState('./session.json');


const startduck = async() => {
const { version, isLatest } = await fetchLatestBaileysVersion();

CFonts.say(`${package.name.split('-')[0]}|Bot`, {
font: 'simpleBlock',
align: 'center',
colors: ['greenBright'],
background: 'transparent',
letterSpacing: 1,
space: true,
});
CFonts.say(`${package.version}`, {
font: 'console',
align: 'center',
colors: ['greenBright'],
background: 'transparent',
letterSpacing: 1,
space: true,
});

const duck = makeWASocket({ version, logger: P({ level: 'silent' }), printQRInTerminal: true, auth: state, browser: ['ducktys', 'Chrome', '3.0.0'] });

duck.ev.on('messages.upsert', async ({ messages }) => {
const msg = messages[0];
if (msg.fromMe) return;
require('./duck')(duck, msg);
});

duck.ev.on('group-participants.update', async (apdet) =>{
console.log(apdet)
})


duck.ev.on('connection.update', (update) => {
console.log('Connection update:', update)
if (update.connection === 'open') 
console.log("Connected with " + duck.user.id)
else if (update.connection === 'close')
startduck()

})


duck.ev.on('creds.update', saveState);
};



startduck();

