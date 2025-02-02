import { Command } from "../client/Command";

export default new Command(
{
    name: "ping",
    description: "test",
        
    run: async ({ interaction }) => 
    {
        await interaction.editReply('HELLO')
    }
});