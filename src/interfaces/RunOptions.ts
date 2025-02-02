import { ExtendedClient } from "../client/Client";
import { ExtendedInteraction } from "./ExtendedInteraction";
import {
    CommandInteractionOptionResolver
} from "discord.js";

export interface RunOptions {
    client: ExtendedClient;
    interaction: ExtendedInteraction;
    args: CommandInteractionOptionResolver;
}