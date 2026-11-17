import type { IncomingMessage, ServerResponse } from "http";
import { productService } from "../service/product.service";
import type { Iproduct } from "../types/products";


const ProductController = (req: IncomingMessage, res: ServerResponse) => {


  const url = req.url;
  const method = req.method

  const urlParams = url?.split("/")
  const id = urlParams && urlParams[1] === "products" ? Number(urlParams[2]) : null;
  console.log(typeof id);

  if (url === "/products" && method === "GET") {


    const products = productService();

    res.writeHead(200, { 'Content-Type': 'Application/json' });
    res.end(JSON.stringify({ message: "products retrived successfully", data: products }))
  } else if (method === "GET" && id !== null) {

    const products = productService();

    const product = products.find((p: Iproduct) => p.id == id)
    
    res.writeHead(200, { 'Content-Type': 'Application/json' });
    res.end(JSON.stringify({ message: "products retrived successfully", data: product }))

  }



}
export default ProductController