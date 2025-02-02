import { Event } from "../client/Event";

export default new Event("ready", () => {
    console.log("Bot is online");
});
