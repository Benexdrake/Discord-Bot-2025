
import { ExtendedInteraction } from "./ExtendedInteraction";
import {
    CommandInteractionOptionResolver
} from "discord.js";

export interface RunOptions {
    client: any;
    interaction: ExtendedInteraction;
    args: CommandInteractionOptionResolver;
}