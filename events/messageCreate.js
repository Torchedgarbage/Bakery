module.exports = (cake, msg) => {
    if(msg.author.bot) return;
    if(msg.channel.type === "dm") return;

    let message = msg.content.toLowerCase() || msg.content.toUpperCase()
    const prefixes = ["🍰 ", "bk!", "bakery ", "cake ", `<@!${cake.user.id}>`, `<@${cake.user.id}>`]
    let prefix = false;
    for(const pfx of prefixes) {
        if(message.startsWith(pfx)) prefix = pfx;
    }

    if(msg.content === `<@!${cake.user.id}>` || msg.content === `<@${cake.user.id}>`) {
		msg.channel.createMessage({embed: {
			color: 0xFE0060,
            description: `Welcome to Bakery, the rewrite of a decently known Cake bot! I do the same things
                         as before, provide you with everything relating to Cake: cake facts, cake images and even a handful of memes relating to cakes. 
                         Want to get started? run \`bakery help\` to find out all of my commands!`
		}})
    }
    if (!prefix) return;

    const args = msg.content.slice(prefix.length).trim().split(" ")
    const command = args.shift().toLowerCase()
    try {
        let cmd;
        if(cake.commands.has(command)) {
            cmd = cake.commands.get(command).command
        } else if(cake.aliases.get(command)) {
            cmd = cake.commands.get(cake.aliases.get(command)).command
        } else {
            return;
        }
        cmd.run(cake, msg, args, prefix)
    } catch(err) {
        console.log(err)
    }
}