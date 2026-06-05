// Autoria Leo-Shiba GitHub
const{extrairMencionado,jidParaNumero}=require('../core/utils');
module.exports={nome:'resetar',aliases:['clearwarn'],descricao:'Zera os avisos de um membro.',apenasAdmin:true,apenasGrupo:true,executar:async({sock,msg,jid,db})=>{canst alvo=extrairMencionado(msg);if(!alvo)return sock.sendMessage(jid,{text:'Mencione quem.'});db.resetarAvisos(jid,alvo);await sock.sendMessage(jid,{text:`✅ Avisos de @${jidParaNumero(alvo)} zerados.`,mentions:[alvo]});}};
