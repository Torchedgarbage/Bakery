exports.command = {
    run: (bakery, msg, args, prefix) => {
        const owner = bakery.users.get("439373663905513473")
        const cmds = bakery.commands.filter(c => !c.command.config.ownerOnly).map(c => `\`${prefix}${c.command.help.usage}\` **--** ${c.command.help.desc}`).join("\n")
        if(!args[0]) {
            msg.channel.createMessage({embed: {
                color: 0xFE0060,
                description: cmds,
                author: {
                    name: "Bakery - Help",
                    icon_url: bakery.user.avatarURL
                },
                thumbnail: {
                    url: bakery.user.avatarURL.replace("jpg", "png")
                },
                footer: {
                    text: `Requested by ${msg.author.username}#${msg.author.discriminator} | ©️ 2020 ${owner.username}#${owner.discriminator}`,
                    icon_url: msg.author.avatarURL
                }
            }})
        } else {
            const cmd = bakery.commands.get(args[0])
            msg.channel.createMessage(cmd)
        }
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