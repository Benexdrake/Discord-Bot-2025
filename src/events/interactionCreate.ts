import { APITextInputComponent, CommandInteractionOptionResolver, ModalSubmitInteraction } from "discord.js";
import { client } from "..";
import { Event } from "../client/Event";
import { ExtendedInteraction } from "../interfaces/ExtendedInteraction";

export default new Event("interactionCreate", async (interaction) => {    
    // Chat Input Commands
    if (interaction.isCommand()) {
        const command = client.commands.get(interaction.commandName);
        if(!command?.name.includes('modal'))
            await interaction.deferReply();
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
