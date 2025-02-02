import {ExtendedClient} from "./client/Client"

export const client = new ExtendedClient();
client.start(__dirname);