import type { IncomingMessage, ServerResponse } from "http";
import { productService } from "../service/product.service";


const ProductController = (req: IncomingMessage, res: ServerResponse) => {


  const url = req.url;
  const method = req.method

  if (url === "/products" && method === "GET") {


   const products = productService();
   
    res.writeHead(200, { 'Content-Type': 'Application/json' });
    res.end(JSON.stringify({ message: "products retrived successfully",data:products }))
  }



}
export default ProductController