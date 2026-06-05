// Autoria Leo-Shiba GitHub
module.exports={nome:'exemplo',aliases:[],descricao:'Comando de exemplo.',apenasAdmin:false,apenasGrupo:false,executar:async({sock,jid,args})=>{await sock.sendMessage(jid,{text:`Voce passou: ${args.join(' ')||'(nada)'}`});}};
