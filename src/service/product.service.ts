import path from "node:path";
import fs from "fs"


const filePath = path.join(process.cwd(),"./src/database/db.json")

export const productService = () => {

    const result = fs.readFileSync(filePath,"utf-8")
    // console.log("parse",JSON.parse(result));
    return JSON.parse(result)
};

