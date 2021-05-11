var axios = require('axios');

//Get the UUID of the player
exports.getUUID =  async function getData(playerName) {
  const joinDate = await axios.get(`https://api.ashcon.app/mojang/v2/user/${playerName}`)
  const uuid = await axios.get(`https://api.ashcon.app/mojang/v2/user/${playerName}`)
  return uuid.data.uuid
}

//get the join date from the player
exports.getJoinDate = async function getJoinDate(playerName) {
  const joinDate = await axios.get(`https://api.ashcon.app/mojang/v2/user/${playerName}`)
  return joinDate.data.created_at
}


//Check if user has an Optifine cape
exports.hasOptifineCape = async function getOptifineCape(playerName) {
  try {
    var apiRes = await axios.get(`http://s.optifine.net/capes/${playerName}.png`);
		return true
  } catch (err) {
    return false
  }
}

//Check if user has a vanilla cape (from Minecon or other capes)
exports.hasVanillaCape = async function getVanillaCape(playerName) {
  try {
    var uuid = await axios.get(`https://api.ashcon.app/mojang/v2/user/${playerName}`)
    var apiRes = await axios.get(`https://crafatar.com/capes/${uuid.data.uuid}`);
		return true
  } catch (err) {
    return false
  }
}

//Check if player exists
exports.exists = async function checkIfUserExists(playerName) {
  try {
    await axios.get(`https://api.ashcon.app/mojang/v2/user/${playerName}`)
    return true
  }
  catch {
    return false
  }
}


//Get the name history of the player
exports.getNameHistory = async function getHistory(playerName) {
  var data = await axios.get(`https://api.ashcon.app/mojang/v2/user/${playerName}`)
  var nameHistory = data.data.username_history
  return nameHistory
}