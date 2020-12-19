if (args.length < 1 || !['search', 'random'].includes(args[0])) 

    if (args.length < 1 || !['search', 'random'].includes(args[0].toLowerCase())) return message.channel.send('`neu!urban search|random <query>`');

let image = 'https://media.giphy.com/media/13twUEuUnCrEju/giphy.gif'
let search = args[1] ? urban(args.slice(1).join(" ")) : urban.random()
try {
    search.first(res => {
        if (!res) return message.channel.send("No results found for this topic!")
        let (word, definition, example, thumbs_up, thumbs_down, permalink, author) = res;

        let uembed = new Discord.MessageEmbed()
            .setAuthor(`Urban Dictionary | ${word}`, image)
            .setThumbnail(image)
            .setDescription(stripIndents`**Definition** ${definition || "No definition"}
                        **Example** ${example || "No Example"}
                        **Upvotes** ${thumbs_up || 0}
                        **Downvotes** ${thumbs_down || 0}
                        **Link** [link to word](${permalink || "https://www.urbandictionary.com/"})`)
            .setTimestamp()
            .setFooter(`Written by ${author || "unknown"}`);

        message.channel.send(uembed);
    })
} catch (e) {
    console.log(e)
    return message.channel.send("It seems that i have encountered an error, please try again")
}
        }