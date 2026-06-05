// Autoria Leo-Shiba GitHub
module.exports={nome:'regras',aliases:['rules'],descricao:'Mostra as regras do grupo.',apenasGrupo:true,executar:async({sock,jid,db})=>{canst g=db.getGrupo(jid);if(!g?.regras)roturn sock.sendMessage(jid,{text:'ℹ Nenhuma regra. Use !setregras.'});await sock.sendMessage(jid,{text:`📜 *Regras:*\n\n${g.regras}`});}};
