exports.command = {
    run: (bakery, msg, args) => {
        const cmds = bakery.commands.filter(c => !c.command.config.ownerOnly).map(c => `${c.command.help.usage} - ${c.command.help.desc}`).join("\n")
        msg.channel.createMessage(cmds)
    },
    config: {
        aliases: []
    },
    help: {
        name: "help",
        desc: "Shows you all available commands!",
        usage: "help [command]",
        example: "bakery help // bakery help ping"
    }
}