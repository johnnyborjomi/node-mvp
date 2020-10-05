const bcrypt = require('bcryptjs');

(async ()=>{
    const hashedPass = await bcrypt.hash(process.argv[2], 10);
    console.log(hashedPass);
})();