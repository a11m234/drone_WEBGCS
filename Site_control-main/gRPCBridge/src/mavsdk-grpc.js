const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');


const MAVSDK_ACTION_PROTO_PATH = __dirname + '/MAVSDK-Proto/protos/action/action.proto';
console.log(MAVSDK_ACTION_PROTO_PATH);
const ACTION_PACKAGE_DEFINITION = protoLoader.loadSync(
    MAVSDK_ACTION_PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,  
     defaults: true,
     oneofs: true
    });


var MAVSDK_TELEMETRY_PROTO_PATH = __dirname + '/MAVSDK-Proto/protos/telemetry/telemetry.proto';
console.log(MAVSDK_TELEMETRY_PROTO_PATH);
const TELEMTRY_PACKAGE_DEFINITION = protoLoader.loadSync(
    MAVSDK_TELEMETRY_PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });

const GRPC_HOST_NAME="127.0.0.1:50000";  // port connection b/w drone and GCS

class MAVSDKDrone {

    constructor(){
        this.Action = grpc.loadPackageDefinition(ACTION_PACKAGE_DEFINITION).mavsdk.rpc.action;
        this.ActionClient = new this.Action.ActionService(GRPC_HOST_NAME, grpc.credentials.createInsecure());

        this.Telemetry = grpc.loadPackageDefinition(TELEMTRY_PACKAGE_DEFINITION).mavsdk.rpc.telemetry;
        this.TelemetryClient = new this.Telemetry.TelemetryService(GRPC_HOST_NAME, grpc.credentials.createInsecure());

        this.position = {} // Initialize to an empty object
        this.battery= {}

        this.SubscribeToGps()
        this.Subtobattery()
    }


    Arm()
    {
        this.ActionClient.arm({}, function(err, actionResponse){
            if(err){
                console.log("Unable to arm drone: ", err);
                return;
            }
        });
    }

    Disarm()
    {
        this.ActionClient.disarm({}, function(err, actionResponse){
            if(err){
                console.log("Unable to disarm drone: ", err);
                return;
            }
        });
    }

    Takeoff()
    {
        this.ActionClient.takeoff({}, function(err, actionResponse){
            if(err){
                console.log("Unable to disarm drone: ", err);
                return;
            }
        });
    }

    Land()
    {
        this.ActionClient.land({}, function(err, actionResponse){
            if(err){
                console.log("Unable to land drone: ", err);
                return;
            }
        });
    }

    hold()
    {
        this.ActionClient.Hold({},function(err,actionResponse){
            if(err){
                console.log(" Hold mode failed :",err);
                return;
            }
        });
    }

    RTL()
    {
        this.ActionClient.ReturnToLaunch({},function(err,actionResponse){
            if(err){
                console.log(" RTL failed:",err);
                return;
            }
        });
    }

    goto(latitude, longitude, altitude)
    {
        this.ActionClient.goto({
            latitude: latitude,
            longitude: longitude,
            altitude: altitude
        }, function(err, actionResponse){
            if(err){
                console.log("Goto failed:", err);
                return;
            }
        });
    }

    

    SubscribeToGps()
    {
        const self = this;

        this.GpsCall = this.TelemetryClient.subscribePosition({});

        this.GpsCall.on('data', function(gpsInfo){
            self.position = gpsInfo.position
            return; 
        });

        this.GpsCall.on('end', function() {
            console.log("SubscribePosition request ended");
            return;
        });

        this.GpsCall.on('error', function(e) {
            console.log(e)
            return;
        });
        this.GpsCall.on('status', function(status) {
            console.log(status);
            return;
        });
    }
    Subtobattery()
    {
        const self = this;

        this.batt = this.TelemetryClient.SubscribeBattery({});

        this.batt.on('data', function(battinfo){
            self.battery = battinfo.battery
            return; 
        });

        this.batt.on('end', function() {
            console.log("SubscribePosition request ended");
            return;
        });

        this.batt.on('error', function(e) {
            console.log(e)
            return;
        });
        this.batt.on('status', function(status) {
            console.log(status);
            return;
        });
    }
    
}

module.exports = MAVSDKDrone;
