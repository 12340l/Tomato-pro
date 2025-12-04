import express from "express";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import { createBareServer } from "@tomphttp/bare-server-node";

const app = express();
const server = http.createServer();

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Wisp-compatible transport server
const bare = createBareServer("/wisp/");

// Serve the public folder
app.use(express.static(path.join(__dirname, "public")));

// Handle normal HTTP requests
server.on("request", (req, res) => {
    if (bare.shouldRoute(req)) {
        bare.routeRequest(req, res);
    } else {
        app(req, res);
    }
});

// Handle WebSocket upgrade requests
server.on("upgrade", (req, socket, head) => {
    if (bare.shouldRoute(req)) {
        bare.routeUpgrade(req, socket, head);
    } else {
        socket.end();
    }
});

// Start server
server.listen(8080, () => {
    console.log("Potato Proxy running on http://localhost:8080");
});
