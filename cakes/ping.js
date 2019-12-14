exports.command = {
    run: (bakery, msg) => {
        msg.channel.createMessage("Pong!")
    },
    config: {
        aliases: []
    },
    help: {
        name: "ping"
    }
}