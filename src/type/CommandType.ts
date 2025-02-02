import {
    ChatInputApplicationCommandData,
    PermissionResolvable
} from "discord.js";
import { RunOptions } from "../interfaces/RunOptions";

type RunFunction = (options: RunOptions) => any;

export type CommandType = {
    userPermissions?: PermissionResolvable[];
    run: RunFunction;
} & ChatInputApplicationCommandData;