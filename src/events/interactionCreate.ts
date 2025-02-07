import { APITextInputComponent, CategoryChannel, ChannelType, CommandInteractionOptionResolver, ComponentType, GuildBasedChannel, GuildMember, GuildMemberRoleManager, Interaction, InteractionCollector, MessageFlags, ModalSubmitInteraction, StringSelectMenuComponent, StringSelectMenuInteraction, TextInputComponentData } from "discord.js";
import { client } from "..";
import { Event } from "../client/Event";
import { ExtendedInteraction } from "../interfaces/ExtendedInteraction";

import {getVoiceConnection, joinVoiceChannel} from '@discordjs/voice';
import { channel } from "diagnostics_channel";

declare var dungeon_select:string

export default new Event("interactionCreate", async (interaction) => 
{        
    let dungeon = '';

    if(interaction.isStringSelectMenu())
    {
        interaction.deferUpdate();
    }

    if(interaction.isButton())
    {  
        // Typen Änderung von roles in GuildMemberRoleManager
        // const roles_cache = interaction.member?.roles as GuildMemberRoleManager

        // // Wandeln der roles in ein array
        // const roles = Array.from(roles_cache.cache.values())

        // // Findet den Index aus der roles, dessen name ist
        // const index = roles?.findIndex(x => x.name.includes('===TEST==='))

        // // Holt sich die Rolle mit dem Level, z.B. 20+
        // const level = roles[index + 2]?.name
        

        // // Demo Dungeon Name
        // const dungeonName = 'befallen_forge'
        
        // const guild = interaction.guild;

        // const category = guild?.channels.cache.find(x => x.type === ChannelType.GuildCategory && x.name === 'AoC') as CategoryChannel;
        
        // const childs = category.children.cache.filter(x => x.name.includes(dungeonName))
        
        // // Erstellt einen Voice Channel mit einem kombinations Namen, aus Dungeon Name, Level und Zahl
        // const v = guild?.channels.create(
        //     {
        //         name:`${dungeonName} - ${level} - [${childs.size + 1}]`,
        //         type:ChannelType.GuildVoice,
        //         parent:category?.id,
        //         // topic:'Information about this Dungeon, maybe Urls...'
        //     }
        // )
        
        // // Fetching neu erstellten Voice
        // const newVoice = await v;
        
        // // Member kann mehrere Typen haben, mit GuildMember hat man Zugriff auf voice
        // const member = interaction.member as GuildMember;

        // // Wechselt den User in den neu erstellten Voice Channel
        // if(newVoice)
        //     member.voice.setChannel(newVoice.id)

        // if(newVoice)
        //     interaction.reply({content:`Please enter <#${newVoice?.id}>, it was created for you!`, flags:MessageFlags.Ephemeral})
        // else
        //     interaction.reply({content:`There was an Error, please try again!`, flags:MessageFlags.Ephemeral})
    
        const selectMenuComponent = interaction.message.components[0].components[0] as StringSelectMenuComponent;

        console.log(process.env.dungeon_select);
        
        // await interaction.reply({content:'HI', flags:MessageFlags.Ephemeral})
        await interaction.deferUpdate();
    }
    
    
    
    // Chat Input Commands
    if (interaction.isCommand()) {
        const command = client.commands.get(interaction.commandName);
        // if(!command?.name.includes('modal'))
            // await interaction.deferReply();
        if (!command)
            return interaction.followUp("You have used a non existent command");
        
        if(interaction.options.data[0]?.value !== undefined)
            console.log(`>>> ${interaction.user.username} used ${command.name} with ${interaction.options.data[0].value}`)
        else
            console.log(`>>> ${interaction.user.username} used ${command.name}`)

        command.run({
            args: interaction.options as CommandInteractionOptionResolver,
            client,
            interaction: interaction as ExtendedInteraction
        });
    }
});
