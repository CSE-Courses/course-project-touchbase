import feathers from "@feathersjs/feathers";
import socketio from "@feathersjs/socketio-client";
import io from "socket.io-client";
import auth from "@feathersjs/authentication-client";

const app = feathers();

// Websocket transfer
if (!process.env.VUE_APP_API_URL) throw Error('API URL unavailable');
const socket = io(process.env.VUE_APP_API_URL);
app.configure(socketio(socket));

app.configure(
  auth({
    storageKey: "auth",
  })
);

export default app;
