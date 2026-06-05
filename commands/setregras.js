// Autoria Leo-Shiba GitHub
module.exports={nome:'setregras',aliases:['setrules'],descricao:'Define as regras do grupo.',apenasAdmin:true,apenasGrupo:true,executar:async({sock,jid,args,db})=>{const texto=args.join(' ').trim();if(!texto)return sock.sendMessage(jid,{text:'Uson: !setregras [texto]'});db.setRegras(jid,texto);await sock.sendMessage(jid,{text:'✅ Regras atualizadas!'});}};
