const { Plugin } = require('powercord/entities');
const { get } = require('powercord/http');

class GenderGuesser extends Plugin {
    startPlugin() {
        this.registerCommand();
    }

    registerCommand() {
        powercord.api.commands.registerCommand({
            command: 'gender',
            aliases: ['gg'],
            usage: '{c} <name>',
            executor: (args) => this.getGender(args)
        });
    }

    async getGender(args) {
        if (!args.length) return {
            send: false,
            result: 'What name should I guess the gender of?'
        };

        const { body } = await get(`https://api.genderize.io?name=${args[0]}`);
        if (!body?.gender) return {
            send: false,
            result: "Couldn't find a gender for that name!"
        };

        const capitalize = text => text[0].toUpperCase() + text.slice(1);

        return {
            send: false,
            result: `There is a ${((body.probability / 1) * 100).toFixed(2)}% chance that ${capitalize(args[0])} is **${body.gender}**.`
        };
    }
}

module.exports = GenderGuesser;