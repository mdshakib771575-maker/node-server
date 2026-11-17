import type { IncomingMessage, ServerResponse } from "http";

const ProductController = (req: IncomingMessage, res: ServerResponse) => {


  const url = req.url;
  const method = req.method

  if (url === "/products" && method === "GET") {

    const products =[
      {
      id:1,
      name:"product-1",
      price:2000
    },
      {
      id:2,
      name:"product-2",
      price:1000
    },
  ]
    res.writeHead(200, { 'Content-Type': 'Application/json' });
    res.end(JSON.stringify({ message: "products retrived successfully",data:products }))
  }



}
export default ProductController