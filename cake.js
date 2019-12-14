/* 
    Destiny, a JavaScript boilerplate/bot template for me to use for my future bots.
    Copyright (C) 2019 SamuraiStacks
    
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

// How we will be interacting with the Discord API,
// with Eris. Discord.js takes too much RAM and you 
// need to heavily modify it to be efficient.
const Eris = require("eris")
const config = require("./config.json")
const Cake = require("./src/Cake.js")
const cake = new Cake.Client(config.token)

// We will be using cat-loggr to log, because
// it looks nice and I really like it.
const CatLoggr = require("cat-loggr")
cake.loggr = new CatLoggr({
    levels: [
        { name: "events", color: CatLoggr._chalk.red.bgBlack },
        { name: "commands", color: CatLoggr._chalk.red.bgBlack },
        { name: "log", color: CatLoggr._chalk.white.bgBlack }
    ]
})

const fs = require("fs")
// This is our command handler, to load up all
// of the commands from the commands directory.

// Get a Map to store the commands (and aliases).
// But to make it "global" we can basically
// attatch it to the client.
// TODO: Make a custom extended Map class.
cake.commands = new Map()
cake.aliases = new Map()

fs.readdir("./cakes/", (err, f) => {
    if(err) return loggr.error(err)

    const files = f.filter(f => f.split(".").pop() === "js")
    if(files.length === 0) {
        cake.loggr.commands("There are no commands to load!")
        console.log(" ")
        return;
    }

    for(let i = 0; i < files.length; i++) {
        let props = require(`./cakes/${files[i]}`)
        props.file = files[i]
        cake.commands.set(props.command.help.name, props)
        props.command.config.aliases.forEach(a => {
            cake.aliases.set(a, props.command.help.name)
        })
        cake.loggr.commands(`Successfully loaded command ${files[i].slice(0, -3)}.`)
    }
})

// Our event handler, to load all events from separate files in 1
// directory. Keeps our main file clean with only things 100% needed.
fs.readdir("./events/", (err, f) => {
    if(err) return loggr.error(err)

    const files = f.filter(f => f.split(".").pop() === "js")

    if(files.length === 0) {
        cake.loggr.events("There are no events to load")
        console.log(" ")
        return;
    }

    for(let i = 0; i < files.length; i++) {
        const event = require(`./events/${files[i]}`)
        cake.on(files[i].slice(0, -3), event.bind(null, cake))
        cake.loggr.events(`Successfully loaded event ${files[i].slice(0, -3)}.`)
    }
})

// Connect to the Discord API.
cake.connect()