import { ActionRowBuilder, ApplicationCommandOptionType, ButtonBuilder, ButtonStyle, ComponentType, EmbedBuilder, MessageFlags, ModalBuilder, SelectMenuBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import { Command } from "../client/Command";

export default new Command(
{
    name: "party",
    description: "lets find a party",
    
    run: async ({ interaction }) => 
    {
        const embed = new EmbedBuilder()
                        .setTitle('Party Finder')
                        .setDescription('Create a Voice for Party or find an existing one.')

        const row1 = new ActionRowBuilder<StringSelectMenuBuilder>();
        const row2 = new ActionRowBuilder<ButtonBuilder>();

        const dungeons = new StringSelectMenuBuilder()
        .setCustomId('dungeons')
        .addOptions(
            [
                {label:'Befallen Forge 1', value:'befallen1', default:true},
                {label:'Befallen Forge 2', value:'befallen2'},
                {label:'Befallen Forge 3', value:'befallen3'}
            ]
        );
        process.env.dungeon_select = 'befallen1';

        const party = new ButtonBuilder()
                    .setCustomId('party')
                    .setLabel('searching')
                    .setStyle(ButtonStyle.Primary)
        row1.addComponents(dungeons)
        row2.addComponents(party)
        
        const reply = await interaction.reply({embeds:[embed], components:[row1, row2],flags:MessageFlags.Ephemeral});

        const collector = reply.createMessageComponentCollector({
            componentType:ComponentType.StringSelect,
            // filter: (i) => i.user.id === interaction.user.id && i.customId === interaction.id,
            // time:60_000
        })
        
        collector.on('collect', (interaction) => 
        {
            process.env.dungeon_select = interaction.values[0]
        });


    }
});