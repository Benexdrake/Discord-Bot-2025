import {
    CommandInteraction,
    GuildMember
} from "discord.js";
import { ExtendedClient } from "../client/Client";

export interface ExtendedInteraction extends CommandInteraction {
    member: GuildMember;
}