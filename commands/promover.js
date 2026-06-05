// Autoria Leo-Shiba GitHub
const{extrairMencionado,jidParaNumero}=require('../core/utils');
module.exports={nome:'promover',aliases:['promote'],descricao:'Promove um membro a admin.',apenasAdmin:true,apenasGrupo:true,executar:async({sock,msg,jid})=>{const alvo=extrairMencionado(msg);if(!alvo)return sock.sendMessage(jid,{text:'Mencione quem.'});try{await sock.groupParticipantsUpdate(jid,[alvo],'promote');await sock.sendMessage(jid,{text:`⬆ @${jidParaNumero(alvo)} e agora admin.`,mentions:[alvo]});}catch(e){await sock.sendMessage(jid,{text:'Erro: '+e.message});}}};
