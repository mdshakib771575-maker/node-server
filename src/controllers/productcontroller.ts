import type { IncomingMessage, ServerResponse } from "http";
import { productService, createProduct } from '../service/product.service';
import type { Iproduct } from "../types/products";
import { BodyParser } from "../utils/parseBody";



const ProductController = async (req: IncomingMessage, res: ServerResponse) => {


  const url = req.url;
  const method = req.method

  const urlParams = url?.split("/")
  const id = urlParams && urlParams[1] === "products" ? Number(urlParams[2]) : null;
  console.log(typeof id);

  if (url === "/products" && method === "GET") {
      
  

    const products = productService();

    res.writeHead(200, { 'Content-Type': 'Application/json' });
    res.end(JSON.stringify({ message: "products retrived successfully", data: products }))
  }
  // single product
   else if (method === "GET" && id !== null) {

    const products = productService();

    const product = products.find((p: Iproduct) => p.id == id)
    
    res.writeHead(200, { 'Content-Type': 'Application/json' });
    res.end(JSON.stringify({ message: "products retrived successfully", data: product }))

  }else if(method === "POST" && url === "/products"){

    const body = await BodyParser(req)
    // console.log ("body", body);
    
    const newPeoduct = {
      id:Date.now(),
      ...body
    }
    console.log(newPeoduct);
    const products = productService();


    products.push(newPeoduct);

  createProduct(products)
      res.writeHead(200, { 'Content-Type': 'Application/json' });
    res.end(JSON.stringify({ message: "products retrived successfully",
       data: products
    }))
    
  }



}
export default ProductController