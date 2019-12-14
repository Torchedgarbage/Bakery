exports.command = {
    run: (bakery, msg) => {
        msg.channel.createMessage("Pong!")
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