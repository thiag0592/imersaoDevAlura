import 'dotenv/config';
//Dependendo do que for,  a maquina que hospedará o servidor pode ter uma versão diferente do node instalado
//Para garantir que as variaveis de ambiente funcionem, instalamos o dotenv e importamos aqui
//Também colocamos aspas duplas no valor das variaveis para garantir que todas as etapas do processo entendam a informação, pois será passado de serviço pra serviço diferentes
//além disso, subir na nuvem não era o foco da imersão, entao o arquivo services.sh vai automartizar algumas coisas
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbconfig.js"

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

export async function getTodosPosts(){
    const db =conexao.db("imersao-instabytee");
    const colecao = db.collection("posts");
    return colecao.find().toArray();
}

export async function criarPost(novoPost) {
    const db =conexao.db("imersao-instabytee");
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPost);
}

export async function atualizarPost(id, novoPost) {
    const db =conexao.db("imersao-instabytee");
    const colecao = db.collection("posts");

    const objID = ObjectId.createFromHexString(id)
    return colecao.updateOne({_id:new ObjectId(objID)},{$set:novoPost});
}