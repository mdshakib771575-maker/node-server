import path from "node:path";
import fs from "fs"
import type { Iproduct } from "../types/products";


const filePath = path.join(process.cwd(), "./src/database/db.json")

export const productService = () => {

    const result = fs.readFileSync(filePath, "utf-8")
    // console.log("parse",JSON.parse(result));
    return JSON.parse(result)
};

export const createProduct = (payload: Iproduct[]) => {
    fs.writeFileSync(filePath, JSON.stringify(payload))

}

