const express = require('express');
const app = express();
app.get("/", (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  response.sendStatus(200);
});
app.listen(process.env.PORT); 

const Discord = require("discord.js");

const client = new Discord.Client({
  partials: ['MESSAGE', 'REACTION', 'CHANNEL', 'GUILD'],
});

const embed = new Discord.MessageEmbed()
	.setColor('#E74C3C')
	.setTitle('Confirmação')
	.setDescription('De BoaNoite & BomDia!')
	.setTimestamp()
	.setFooter('By NoWars - Nono#2009', 'https://cdn.discordapp.com/icons/707585251827777547/c8a7efa6fb1b3a88b0b810d233642d70.png?size=4096');

function getBoaNoites(s){
 s = s.replace("🌙: ", "");
 return Number.parseInt(s.split(",")[0]);
}

function getBomDias(s){
 s = s.replace(" ⛅: ", "");
 return Number.parseInt(s.split(",")[1]);
}

client.on('message', async (message) => {
  if(message.content == '$create'){
    message.channel.send(embed)
            .then(function (message) {
              message.react("🌙")
              message.react("⛅")
              return;
            }).catch(function() {
              console.log('erro create message');
             });
  }
});


client.on('messageReactionAdd', async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (user.bot) return;
  if (!reaction.message.guild) return;
  if (reaction.message.id == '856385567863603241') {

    guild_name = await reaction.message.guild.name;
    dias = getBomDias(guild_name);
    noites = getBoaNoites(guild_name);

    data = new Date();
    data.setHours(data.getHours() - 3);
    data = data.getUTCHours();

     if (reaction.emoji.name === '🌙'){
        if (data >= 1 && data <= 5){
          noites++;
          await reaction.message.guild.setName(`🌙: ${noites}, ⛅: ${dias}`);
        }
        else if (data >= 18 && data <= 23){
          noites++;
          await reaction.message.guild.setName(`🌙: ${noites}, ⛅: ${dias}`);
        }
        if (reaction.count > 1) await reaction.users.remove(user);
        return;
     }

     else if (reaction.emoji.name === '⛅'){
        if (data >= 6 && data <= 11){
          dias++;
          await reaction.message.guild.setName(`🌙: ${noites}, ⛅: ${dias}`);
        }
        if (reaction.count > 1) await reaction.users.remove(user);
        return;
     }

    }

   await reaction.remove();

  
});

client.login(process.env.TOKEN);
