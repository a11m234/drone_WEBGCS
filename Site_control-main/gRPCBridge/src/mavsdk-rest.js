const cors = require('cors');
const express = require('express');
const http = require('http');
const MAVSDKDrone = require('./mavsdk-grpc.js');
const { homedir } = require('os');

const app = express();
const drone = new MAVSDKDrone();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
homedir.latitude = 37.7749; // Example latitude
homedir.longitude = -122.4194; // Example longitude
homedir.altitude = 10; // Example altitude
const FRONT_END_URL = "127.0.0.1:50000"; // Allow all origins

app.use(cors({
    origin: FRONT_END_URL,
    methods: ["GET", "POST"]
}));

// Endpoint definitions
app.get('/start', async (req, res) => {
    try {
        console.log("Hello from arm!");
        await drone.Arm();
        await new Promise(resolve => setTimeout(resolve, 3000)); // 3-second delay

        console.log("Takeoff");
        await drone.Takeoff();
        res.sendStatus(200);
    } catch (error) {
        console.error("Failed to arm or take off the drone:", error);
        res.sendStatus(500);
    }
});

app.get('/disarm', async (req, res) => {
    try {
        console.log("Hello from disarm!");
        await drone.Disarm();
        res.sendStatus(200);
    } catch (error) {
        console.error("Failed to disarm the drone:", error);
        res.sendStatus(500);
    }
});

app.get('/land', async (req, res) => {
    try {
        console.log(" landing!");
        await drone.Land();
        res.sendStatus(200);
    } catch (error) {
        console.error("Failed to land:", error);
        res.sendStatus(500);
    }
});

app.get('/hold', async (req, res) => {
    try {
        console.log("Changing to Hold mode");
        await drone.hold();
        res.sendStatus(200);
    } catch (error) {
        console.error("Failed to change to HOLD mode:", error);
        res.sendStatus(500);
    }
});
app.get('/rth', async (req, res) => {
    try {
        console.log("Changing to RTH mode");
        await drone.goto(homedir.latitude, homedir.longitude, homedir.altitude);
        res.sendStatus(200);
        await drone.Land();
        console.log("Drone has returned to home and landed.");
    } catch (error) {
        console.error("Failed to change to RTH mode:", error);
        res.sendStatus(500);
    }
});
app.get('/rtl', async (req, res) => {
    try {
        console.log("Changing to RTl mode");
        await drone.RTL();
        res.sendStatus(200);
    } catch (error) {
        console.error("Failed to change to RTL mode:", error);
        res.sendStatus(500);
    }
});
app.get('/battery',(req,res)=>{

    const battery = drone.battery || { error: "No battery data is available" };
    res.json(battery);
    

});

app.get('/gps', (req, res) => {
    
    const position = drone.position || { error: "No position data is available" };
    res.json(position);
});

const server = http.createServer(app);
server.listen(8081, () => {
    console.log("DHGCS app listening at http://localhost:8081");
});
