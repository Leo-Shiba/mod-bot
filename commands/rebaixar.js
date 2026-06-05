// Autoria Leo-Shiba GitHub
const{extrairMencionado,jidParaNumero}=require('../core/utils');
module.exports={nome:'rebaixar',aliases:['demote'],descricao:'Remove admin de um membro.',apenasAdmin:true,apenasGrupo:true,executar:async({sock,msg,jid})=>{const alvo=extrairMencionado(msg);if(!alvo)return sock.sendMessage(jid,{text:'Mencione quem.'});try{await sock.groupParticipantsUpdate(jid,[alvo],'demote');await sock.sendMessage(jid,{text:`⬇ @${jidParaNumero(alvo)} nao e mais admin.`,mentions:[alvo]});}catch(e){await sock.sendMessage(jid,{text:'Erro: '+e.message});}}};
