const bcrypt = require('bcrypt')

async function encrypt(content){
  if(content){
      const salt = await bcrypt.genSalt();
      return  await bcrypt.hash(content,salt) //const salt = await bcrypt.genSalt();
    }
  throw Error('content is empty')
}


 function compare(content,localContent){
    if(content)
    return  async () =>  await bcrypt.compare(content,localContent)
  throw Error('content is empty')
}


module.exports = {
    encrypt,
    compare
}