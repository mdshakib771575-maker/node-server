import type { IncomingMessage, ServerResponse } from "http";
import { productService, createProduct } from '../service/product.service';
import type { Iproduct } from "../types/products";
import { BodyParser } from "../utils/parseBody";
import { SendResponse } from "../utils/sendResponse";



const ProductController = async (req: IncomingMessage, res: ServerResponse) => {


  const url = req.url;
  const method = req.method

  const urlParams = url?.split("/")
  const id = urlParams && urlParams[1] === "products" ? Number(urlParams[2]) : null;
  console.log(typeof id);

  if (url === "/products" && method === "GET") {
    const products = productService();

    if (!products) {
       return  SendResponse(res,false,404,"product can not found")
    };



    res.writeHead(200, { 'Content-Type': 'Application/json' });
    res.end(JSON.stringify({ message: "products retrived successfully", data: products }))
  }
  // single product
  else if (method === "GET" && id !== null) {

    const products = productService();

    const product = products.find((p: Iproduct) => p.id == id)
    if(!product){
     return  SendResponse(res,false,404,"product can not found")
    }
    try{
      SendResponse(res, true, 200, "products retrived successfully", product)
    }catch(error){
        SendResponse(res, false, 500, "Internal server error")
    }
      

  } else if (method === "POST" && url === "/products") {

    const body = await BodyParser(req)
    // console.log ("body", body);

    const newPeoduct = {
      id: Date.now(),
      ...body
    }
    console.log(newPeoduct);
    const products = productService();


    products.push(newPeoduct);

    createProduct(products)
   try{

     SendResponse(res, true, 200, "products retrived successfully", products)
   }catch(error){
         SendResponse(res, false, 500, "Internal Server Error")
   }

  } else if (method === "PUT" && id !== null) {

    const products = productService();
    const body = await BodyParser(req);

    const index = products.findIndex((p: Iproduct) => p.id == id)
    // console.log(index);

    if (index < 0) {
     return SendResponse(res, false, 404, "product can not found")
    };
    products[index] = { id: products[index].id, ...body };
    console.log(products[index]);

    createProduct(products);
   try{
     SendResponse(res, true, 200, "products update successfully", products[index])
   }catch(error){
       SendResponse(res, false, 500, "Inrernal Server Error")
   }
  } else if (method === "DELETE" && id !== null) {

    const products = productService();


    const index = products.findIndex((p: Iproduct) => p.id == id)


    if (index < 0) {
     return SendResponse(res, false, 404, "Product can not found");
    };

    products.splice(index, 1)
    createProduct(products)
  }

}
export default ProductController