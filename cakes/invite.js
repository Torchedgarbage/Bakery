exports.command = {
    run: (bakery, msg) => {
        msg.channel.createMessage({embed: {
            color: 0x00ff00,
            description: `❤️ You can invite me to your server by clicking [here](https://discordapp.com/oauth2/authorize?client_id=586317322525081641&scope=bot&permissions=104197313)!
                          ⛑️ And my support server is [here](https://discord.gg/xk2SjaZ) if you need support.`,
            author: {
                name: "Bakery - Invite",
                icon_url: bakery.user.avatarURL
            }
        }})
    },
    config: {
        aliases: ["support"]
    },
    help: {
        name: "invite",
        desc: "Sends the link to invite me and my support server.",
        usage: "invite",
        example: "bakery invite"
    }
}