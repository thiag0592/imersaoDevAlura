import multer from "multer";
import express from "express";
import cors from "cors";
import { listarPosts , postarNovoPost , uploadImagem , atualizarNovoPost} from "../controllers/postsControler.js";

const corsOptions = {
    origin:"http://localhost:8000",
    optionsSuccessStatus: 200
}

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,'uploads/');
    },
    filename: function (req,file,cb){
        cb(null, file.originalname);
    }
})

const upload = multer({dest:"./uploads", storage})

const routes = (app)=>{
    app.use(express.json());
    app.use(cors(corsOptions))    
    
    app.get("/posts", listarPosts);
    app.post("/posts", postarNovoPost);
    //Quando você digita um endereço, o navegador faz uma requisição GET
    //O método HTTP diferencia as rotas, mesmo que o caminho seja o mesmo. O servidor consegue distinguir entre solicitações GET e POST, permitindo que ações diferentes sejam realizadas dependendo do tipo de requisição.
    
    app.post("/upload", upload.single("imagem"), uploadImagem);
    //neste momento tempos que avisar que não são apenas caracteres, mas tem um arquivoo a ser enviado

    app.put("/upload/:id", atualizarNovoPost);
}

export default routes;