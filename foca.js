 require('dotenv').config()
const Discord = require("discord.js");
const client = new Discord.Client();
const urlfoca = `https://sac.focasoftware.com/sac/usuario/informes/buscar_inc.php?mand_idd=`;
const puppeteer = require('puppeteer');
let url = `http://sac.focasoftware.com/sac/usuario/incidencias/listas/listausuarios.php?mand_idd=`
const token = process.env.TOKEN_DISCORD
client.login(token);
client.on("ready", () => {
  console.log("BOT FOCA READY");
});


let asignado = '';
let cliente = ''
let asunto= '';
let detalle='';

client.on("message", (message) => {

  if ((message.content.startsWith('!')) || (message.content > 200000 && message.content < 400000)){
    mensaje = message;
    textoMensaje = (message.content.replace('!', '')).toLowerCase();
  
  if (textoMensaje > 200000 && textoMensaje < 400000) {
          let numIncidencia = textoMensaje;
          mensajeTemporal(mensaje.channel, numIncidencia, mensaje);
                   
        } else if (textoMensaje == 'comandos') {
            mensaje.channel.send("", {


              embed: {
                title: `Comandos actuales:`,
               fields: [
                  {
                    name: `<Nº incidencia>`,
                    value: `Muestra los detalles de una incidencia por chat`
                  },
                  {
                    name: `<ID de TeamViewer>`,
                    value: `Genera link para poder conectar`
                  },
                  {
                    name: `!kick @usuario`,
                    value: `Kickea a un usuario del canal de voz`
                  },
                  {
                    name: `<select * from...>`,
                    value: `Muestra el query embebido`
                  },
                  {
                    name: `!sql2019`,
                    value: `Link para descargar SQL2019`
                  },
                  {
                    name: `!sql2016`,
                    value: `Link para descargar SQL2016`
                  },
                  {
                    name: `!sql2008`,
                    value: `Link para descargar SQL2008`
                  },
                  {
                    name: "!git",
                    value: `Link para descargar GIT`
                  },
                  {
                    name: "!xampp",
                    value: `Link para descargar XAMPP`
                  },
                  {
                    name: "!adobe",
                    value: `Link para descargar ADOBE READER 11 FULL`
                  }
                ],
                color: 16774400,
              }

            }
            )
        } else if (textoMensaje == 'sql2008') {
          message.reply("", {
            embed: {
              author: `Foca BOT`,
              description: `[SQL 2008](https://drive.google.com/u/0/uc?id=0B237whzqWlkWR0gyYmVicW8xOUE&export=download)`,
              color: 16774400,
            }});
        }

        else if (textoMensaje == 'sql2016') {
          message.reply("", {
            embed: {
              author: `Foca BOT`,
              description: `[SQL 2016](https://drive.google.com/uc?id=11aO9kNnNp84s1EVFtnJDbaFqwL4mLr_r&export=download)`,
              color: 16774400,
            }});
        }
        else if (textoMensaje == 'sql2019') {
          message.reply("", {
            embed: {
              author: `Foca BOT`,
              description: `[SQL 2019](https://drive.google.com/uc?id=1YwsRQng89aim-thgPikNdN3QYPtIcoWk&export=download)`,
              color: 16774400,
            }});
        }
        else if (textoMensaje == 'git') {
          message.reply("", {
            embed: {
              author: `Foca BOT`,
              description: `[GIT](http://debonline.dyndns.org:4334/owncloud/index.php/s/PsRE2zkiwytl1Bw/download) , para clonar MercadoPago tirar => **git clone git@debonline.dyndns.org:php/mp_websocket_client.git**`,
              color: 16774400,
            }});
        }
        else if (textoMensaje == 'xampp') {
          message.reply("", {
            embed: {
              author: `Foca BOT`,
              description: `[XAMPP](http://debonline.dyndns.org:4334/owncloud/index.php/s/EhY1lxeTVj2bIY0/download)`,
              color: 16774400,
            }});
        }
        else if (textoMensaje == 'adobe') {
          message.reply("", {
            embed: {
              author: `Foca BOT`,
              description: `[ADOBE READER](http://debonline.dyndns.org:4334/owncloud/index.php/apps/files/ajax/download.php?dir=%2FREPOSITORIO%2FRETAIL%2F1.Instaladores&files=ADOBE%20READER%20FULL%2011.exe)`,
              color: 16774400,
            }});
         } else if (textoMensaje.includes(`kick`)) {
          
          memberTarget = message.mentions.members.first();
          
          if (!message.member.hasPermission('KICK_MEMBERS')) {
            message.reply('No tenes permiso para hacer eso capo')} 
            else if (!memberTarget){
              message.channel.send('A quien queres que kickee master? A vos?')
            } else if (!memberTarget.voice.channel) {
              message.channel.send ('Ese pibe ni está en el chat de voz, deja de flashear')
            } else {
              memberTarget.voice.kick().then((member) => {
              message.channel.send(`${member} se fue kickeadisimo :wave:`)
            }).catch(console.error)
          }
          
       }else if (textoMensaje == '208') {
          message.reply("", {
            embed: {
              title: `Foca BOT`,
              author: `Foca BOT`,
              description: `no funca`,
              color: 16774400,
            }})
        }
      } else if ( (message.content.replace(/\s/g, "")) > 100000000 && (message.content.replace(/\s/g, "")) < 1999999999 ){

        let ID = message.content.replace(/\s/g, "");
        
        message.channel.send("", {
                 embed: {
                 author: `Foca BOT`,
                 title: `Conexion`,
                 description: `:busts_in_silhouette:   ID de TeamViewer detectada, clickea [ACA](https://start.teamviewer.com/${ID}) para conectarte`,
                 color: 4491502,
               }}
             )
       }
       else if (message.content.toLowerCase().startsWith(`select * from`)) {
        message.reply('Query formateado: ```'+message.content+'```')
    }});
      
      async function main(link,numIncidencia) {
        //inicia puppeteer
        const browser = await puppeteer.launch({headless: true});
        const page = await browser.newPage();
        //setea tamaño del viewport
        await page.setViewport({width: 1200, height: 720});
        //navega a la pagina
        await page.goto(link, { waitUntil: 'networkidle0' }); // wait until page load
        await traerDatos(page);
        browser.close();
       }


      async function traerDatos(page) {
        
        if (await (page.evaluate(() => document.querySelector('tr+ tr .td:nth-child(4)'))) != null) {
            asignado =  await page.evaluate(() => document.querySelector('tr+ tr .td:nth-child(4)').innerHTML)

          } else {
            asignado = 'vacio'
          }
          
          if (await (page.evaluate(() => document.querySelector('.enlace'))) != null) {
            cliente = await page.evaluate(() => document.querySelector('.enlace').innerHTML)
            
          } else {
            cliente = 'vacio'
          }
          
          if (await (page.evaluate(() => document.querySelector('tr:nth-child(2) .td:nth-child(2)'))) != null) {
            asunto = await page.evaluate(() => document.querySelector('tr:nth-child(2) .td:nth-child(2)').innerHTML)
            
          } else {
            asunto = 'vacio'
          }
          
          if (await (page.evaluate(() => document.querySelector('.ReporteMaestro'))) != null) {
            detalle = await page.evaluate(() => document.querySelector('.ReporteMaestro').innerHTML)
            
          } else {
            detalle = 'vacio'
          }
          
          for (i=0; i<200; i++){
            detalle = detalle.replace('<br>', '\n');
            detalle = detalle.replace('\n\n\n\n', '\n')
            detalle = detalle.replace('\n\n\n', '\n')
            detalle = detalle.replace('\n\n', '\n')
            }
            
      }
      const mensajeTemporal = async (channel,numIncidencia, mensajeUsuario) => {
        const link = `${url}${numIncidencia}`
    
        const d = new Promise (async (resolve,reject) => {

          mensajeUsuario.channel.send("", {
            embed: {description: `Buscando incidencia ${numIncidencia}...`,
                    color: 5814783,
            }}).then((message) => {
              setTimeout(() => {message.delete()}, 1500)

            })


            await main(link,numIncidencia);
           
              if (asunto == 'vacio' || cliente == 'vacio' || detalle == 'vacio' || asignado == 'vacio') {
                reject(mensajeUsuario)
              } else {
                resolve(mensajeUsuario)
              }

        })
        
          d.then((message) => { 

            
              message.channel.send("", {
                embed: {
                  title: `Incidencia ${numIncidencia}`,
                  author: {
                    "name": `${asignado.toUpperCase()}`
                  },
                  
                  fields: [
                    {
                      name: "Cliente",
                      value: `${cliente}`
                    },
                    {
                      name: "Asunto",
                      value: `${asunto}`
                    },
                    {
                      name: "Detalle",
                      value: `${detalle}`
                    }
                  ],
                  url: `${link}`,
                  color: 4259622,
                }}
              )
         
          }).catch((message) => {message.channel.send("", {
            embed: {description: `Incidencia **${numIncidencia}** no se puede mostrar, dejo el link [ACÁ](${link})`,
            color: 16711680,
              }})})}
                
        async function unirAsignado(page) {
          asignado =  await page.evaluate(() => document.querySelector('tr+ tr .td:nth-child(4)')).innerHTML;
        }