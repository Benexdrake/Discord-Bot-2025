import {
    ActivityType,
    ApplicationCommandDataResolvable,
    Client,
    ClientEvents,
    Collection
} from "discord.js";
import glob from "glob";
import { promisify } from "util";
import dotenv from 'dotenv';

import { Event } from './event';
import { CommandType } from "../types/CommandType";
import { RegisterCommandsOptions } from "../interfaces/RegisterCommandsOptions";

const globPromise = promisify(glob);
const app = new Client({intents:32767})

const commands: Collection<string, CommandType> = new Collection();

dotenv.config();

export const start = (dir:string) =>
{
    registerModules(dir);
    
    app.login(process.env.token)
}

const importFile = async (filePath:string) =>
{
    return await import(filePath);
}

const registerModules = async (dir:string) =>
{
    // Commands
    const slashCommands: ApplicationCommandDataResolvable[] = [];
    const commandFiles = await globPromise( `${dir}/commands/*.ts` );

    commandFiles.forEach(async (filePath) => {
        const command: CommandType = await importFile(filePath);
        if (!command.name) return;

        console.log('Registered: '+command.name);

        commands.set(command.name, command);
        slashCommands.push(command);
    });

    app.on("ready", () => {
        console.log('App is ready...');
        
        for(const guild of app.guilds.cache)
        {   
            registerCommands(
            {
                commands: slashCommands,
                guildId: guild[1].id
            });
        }
    });

    const eventFiles = await globPromise(
        `${__dirname}/../events/*{.ts,.js}`
    );

    eventFiles.forEach(async (filePath) => {
        const event: Event<keyof ClientEvents> = await importFile(
            filePath
        );
        app.on(event.event, event.run);
    });
}

const registerCommands = async ({commands, guildId}:RegisterCommandsOptions) =>
{
    if(guildId)
    {
        app.guilds.cache.get(guildId)?.commands.set(commands);
        console.log(`Registering commands to ${guildId}`);
    }
    else
    {
        app.application?.commands.set(commands);
        console.log("Registering global commands");
    }
}



