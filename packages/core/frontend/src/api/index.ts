import feathers from "@feathersjs/feathers";
import socketio from "@feathersjs/socketio-client";
import io from "socket.io-client";
import auth from "@feathersjs/authentication-client";

const app = feathers();

// Websocket transfer
const socket = io("http://localhost:3030");
app.configure(socketio(socket));

app.configure(
  auth({
    storageKey: "auth",
  })
);

export default app;
