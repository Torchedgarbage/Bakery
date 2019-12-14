exports.command = {
    run: (bakery, msg) => {
        msg.channel.createMessage({embed: {
            color: 0xFE0060,
            description: `🏓 Pong! \`${bakery.shards.get(0).latency}\`ms
                          🏘️ In \`${bakery.guilds.size}\` guilds!`,
            author: {
                name: "Bakery - Ping",
                icon_url: bakery.user.avatarURL
            }
        }})
    },
    config: {
        aliases: []
    },
    help: {
        name: "ping",
        desc: "Shows the response time.",
        usage: "ping",
        example: "bakery ping"
    }
}