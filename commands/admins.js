// Autoria Leo-Shiba GitHub
const{jidParaNumero}=require('../core/utils');
module.exports={nome:'admins',descricao:'Lista os admins do grupo.',apenasGrupo:true,executar:async({sock,jid})=>{let meta;try{meta=await sock.groupMetadata(jid);}catch{ return sock.sendMessage(jid,{text:'Erro ao obter admins.'});}const admins=meta.participants.filter(p=>p.admin);if(!admins.length)return sock.sendMessage(jid,{text:'Sem admins.'});await sock.sendMessage(jid,{text:`👑 *Admins (${admins.length}):*\n${admins.map(a=>`- @${jidParaNumero(a.id)}`).join('\n')}`,mentions:admins.map(a=>a.id)});}};
