import type { IncomingMessage, ServerResponse } from "http";
import ProductController from '../controllers/productcontroller';

const RouteHandelar = (req:IncomingMessage,res:ServerResponse)=>{

    const url = req.url;
    const method = req.method

    if(url==="/"&& method==="GET"){
        // console.log("This is a Root ");
        res.writeHead(200, { 'Content-Type': 'Application/json' });
        res.end(JSON.stringify({message:"This is root Route"}))
    }
    else if(url?.startsWith("/products")){
          ProductController(req,res)
    }
    else{
        console.log("");
          res.writeHead(400, { 'Content-Type': 'Application/json' });
        res.end(JSON.stringify({message:"Route not defind"}))
    }
    
}

export default RouteHandelar