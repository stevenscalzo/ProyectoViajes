const Multer = require('multer');

let chars = "0123456789abcdefABCDEF";
let lon = 5;
code = "";
for (x = 0; x < lon; x++) {
    rand = Math.floor(Math.random() * chars.length);
    code += chars.substr(rand, 1);
}


const storage = Multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads'); // relativo al archivo principal del repo
    },

    filename: (req, file, callback) => {
        callback(null, code + file.originalname);
    }
    
});
console.log(storage + " storage");
const upload = Multer({ storage });
module.exports = upload;