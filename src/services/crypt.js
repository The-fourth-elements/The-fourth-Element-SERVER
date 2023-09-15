const bcrypt = require('bcrypt')



// hash para password
async function encrypt(content){
  if(content){
      const salt = await bcrypt.genSalt();
      return  await bcrypt.hash(content,salt) 
    }
  throw Error('content is empty')
}


// comparar hash!
 function compare(content,localContent){
    if(content)
    return  async () =>  await bcrypt.compare(content,localContent)
  throw Error('content is empty')
}


module.exports = {
    encrypt,
    compare
}
