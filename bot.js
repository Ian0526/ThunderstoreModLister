const { Client, Intents } = require('discord.js');
const axios = require('axios');
const yaml = require('js-yaml');
const unzipper = require('unzipper');
const { Readable } = require('stream');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

const token = process.env.DISCORD_TOKEN;

async function fetchModNames(uuid) {
    try {
        const url = `https://thunderstore.io/api/experimental/legacyprofile/get/${uuid}/`;
        const response = await axios.get(url);
        
        if (!response.data.startsWith('#r2modman')) {
            throw new Error("Invalid profile data");
        }

        const base64Data = response.data.split('\n', 2)[1];
        const buffer = Buffer.from(base64Data, 'base64');

        const modNames = [];
        const zipStream = Readable.from(buffer).pipe(unzipper.Parse({ forceStream: true }));
        
        for await (const entry of zipStream) {
            const fileName = entry.path;
            if (fileName === 'mods.yml') {
                const content = await entry.buffer();
                const modsData = yaml.load(content.toString());
                
                modsData.forEach(mod => {
                    if (mod.name) {
                        modNames.push(mod.name);
                    }
                });
                entry.autodrain();
            } else {
                entry.autodrain();
            }
        }
        
        return modNames;
    } catch (error) {
        console.error("Error fetching mod names:", error);
        return null;
    }
}

function splitMessage(content, maxLength = 2000) {
    const lines = content.split('\n');
    let result = [];
    let chunk = '```';
    for (let line of lines) {
        if (chunk.length + line.length + 1 > maxLength) {
            chunk += '```';
            result.push(chunk);
            chunk = '```';
        }
        chunk += line + '\n';
    }
    if (chunk.length > 3) {
        chunk += '```';
        result.push(chunk);
    }
    return result;
}

client.on('messageCreate', async message => {
    if (message.content.startsWith('!modlist')) {
        const args = message.content.split(' ');
        if (args.length < 2) {
            return message.channel.send('Please provide a UUID.');
        }

        const uuid = args[1];
        const modNames = await fetchModNames(uuid);

        if (modNames && modNames.length > 0) {
            const modList = `Mod Names:\n${modNames.join('\n')}`;
            const messages = splitMessage(modList);

            for (const msg of messages) {
                await message.channel.send(msg);
            }
        } else {
            message.channel.send('No mods found or the profile is invalid.');
        }
    }
});

client.login(token);