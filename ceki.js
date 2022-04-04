const { Client } = require("discord.js");
const request = require("request")

const tokens = ["token 1", "token 2", "token 3", "böyle devam et"];
const options = {
    url: "",
    GuildID: "",
    log: ""
}

let durum = false

tokens.forEach(token => {
    const client = new Client({
        fetchAllMembers: true,
        presence: {
            activity: { name: "Developed By Jahky.", type: "LISTENING" }, status: "dnd"
        }
    });

    client.on("ready", () => {
        if (durum) { URL(); }
        console.log(`${client.guilds.cache.get(options.GuildID).name} adlı sunucuda ${options.url} urlsi spamlanmaya başlandı`)
        setInterval(() => {
            if (durum) { URL(); }                   
            let sunucu = client.guilds.cache.get(options.GuildID);
            if (sunucu.vanityURLCode === options.url) {
                client.channels.cache.get(options.log).send(`@everyone ${sunucu.name} adlı sunucunun url si çalınmıştır!`)
                console.log("URL çalındı bottan çıkış yapılıyor ...")
                process.exit(0)
            }
        }, 1);
    })

    function URL() {
        let sunucu = client.guilds.cache.get(options.GuildID);
        if (!sunucu.vanityURLCode || sunucu.vanityURLCode === options.url)
            if (sunucu.vanityURLCode !== options.url) {
                request({
                    method: "PATCH",
                    url: `https://discord.com/api/guilds/${options.GuildID}/vanity-url`,
                    headers: {
                        "Authorization": `Bot ${client.token}`
                    },
                    json: {
                        "code": `${options.url}`
                    }
                });
            }
    }

    client.login(token).then(x => console.log(`${client.user.tag}`))
})
