var api = require('./api.js')
var Discord = require('discord.js')
var token = require('./shh.json').discordToken;
const { default: axios } = require('axios');
var client = new Discord.Client()
client.on('ready', () => {
  console.log("I'm in");
  console.log(client.user.username);
});

var prefix = '!'

client.on('message', async msg => {
	var dataSent = false;
	const args = msg.content.slice(prefix.length).trim().split(' ');
	const command = args.shift().toLowerCase();

  if (command == 'data') {
		if (await api.exists(args[0]) == false) {
			msg.channel.send(`User '${args[0]}' does not exist.`)
			dataSent = true
		}
		else {
		//Getting data from api.js
    var uuid = await api.getUUID(args[0])
    var joinDate = await api.getJoinDate(args[0])
		var hasOptifineCape = await api.hasOptifineCape(args[0])
		//Check if player exists


		//If the user has an optifine cape and a vanilla cape
		if (hasOptifineCape == true && await api.hasVanillaCape(args[0]) == true) {
      if (dataSent == false) {

			const embed1 = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle(args[0] + ' player Data')
			.setImage(`https://crafatar.com/capes/${uuid}`)
			.addFields(
				{ name: 'Join Date', value: joinDate, inline: true },
				{ name: 'UUID', value: uuid, inline: true },
			)
			.setFooter('Vanilla Cape')
			.setThumbnail(`https://crafatar.com/renders/body/${uuid}?scale=3`)

			const embed2 = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle(args[0] + ' Optifine Cape')
			.setFooter('Optifine Cape')
			.setImage(`http://s.optifine.net/capes/${args[0]}.png`)
  		msg.channel.send(embed1)	
		  msg.channel.send(embed2)	
			dataSent = true
			}
		}

		//If the user has an optifine cape
		if (hasOptifineCape == true && dataSent == false) {

			const exampleEmbed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle(args[0] + ' player Data')
			.setImage(`http://s.optifine.net/capes/${args[0]}.png`)
			.addFields(
				{ name: 'Join Date', value: joinDate, inline: true },
				{ name: 'UUID', value: uuid, inline: true },
			)
			.setFooter('Optifine Cape')
			.setThumbnail(`https://crafatar.com/renders/body/${uuid}?scale=3`)

		  msg.channel.send(exampleEmbed)
			dataSent == true
		}

		//If the user has a vanilla cape
		else if (await api.hasVanillaCape(args[0]) == true && dataSent == false) {

			const exampleEmbed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle(args[0] + ' player Data')
			.setImage(`https://crafatar.com/capes/${uuid}`)
			.addFields(
				{ name: 'Join Date', value: joinDate, inline: true },
				{ name: 'UUID', value: uuid, inline: true },
			)
			.setFooter('Vanilla Cape')
			.setThumbnail(`https://crafatar.com/renders/body/${uuid}?scale=3`)

		  msg.channel.send(exampleEmbed)			
			dataSent = true
		}

		//If user has no cape
		else if (dataSent == false) {
			const embed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle(args[0] + ' player Data')
			.addFields(
				{ name: 'Join Date', value: joinDate, inline: true },
				{ name: 'UUID', value: uuid, inline: true },
			)
			.setImage(`https://crafatar.com/renders/body/${uuid}?scale=3`)

			msg.channel.send(embed)
			dataSent = true
		}
  }


 }

 //Get the name history of the player
 if (command == 'history') {
	 if (await api.exists(args[0]) == true) {
		 var nameHistory = await api.getNameHistory(args[0]);
		  for (var i = 0; i < nameHistory.length; i++) {
    		msg.channel.send(nameHistory[i].username)
  		}
}
	 
	 else {
		 msg.channel.send(`User '${args[0]}' does not exist.`)
	 }
 }
});

client.login(token);