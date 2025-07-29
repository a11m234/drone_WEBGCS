# Drone Backend: Ground Control Station (GCS) Setup Guide

This guide provides comprehensive instructions for setting up the Drone Backend Ground Control Station (GCS). It covers the installation of PX4-Autopilot, MAVSDK, gRPC Bridge, and the React-based web application, along with steps to run the complete system.

## Table of Contents

  * [Prerequisites](https://www.google.com/search?q=%23prerequisites)
  * [Reference Materials](https://www.google.com/search?q=%23reference-materials)
  * [1. PX4-Autopilot Installation](https://www.google.com/search?q=%231-px4-autopilot-installation)
  * [2. MAVSDK Installation](https://www.google.com/search?q=%232-mavsdk-installation)
  * [3. gRPC Bridge Setup](https://www.google.com/search?q=%233-grpc-bridge-setup)
  * [4. Web Application Setup](https://www.google.com/search?q=%234-web-application-setup)
  * [5. Running the Complete System](https://www.google.com/search?q=%235-running-the-complete-system)
  * [Verification Steps](https://www.google.com/search?q=%23verification-steps)
  * [Troubleshooting](https://www.google.com/search?q=%23troubleshooting)
  * [Directory Structure](https://www.google.com/search?q=%23directory-structure)

## Prerequisites

Before you begin, ensure you have the following installed:

  * Git
  * CMake
  * Node.js and npm
  * Terminal/Command Prompt
  * Ubuntu (recommended for PX4 SITL)

## Reference Materials

  * **Reference Video:** [https://www.youtube.com/watch?v=QTkLUARSv3c\&t=2166s](https://www.youtube.com/watch?v=QTkLUARSv3c&t=2166s)
  * **Reference GitHub Repository (WebGCS):** [https://github.com/PX4/WebGCS](https://github.com/PX4/WebGCS)

-----

## 1\. PX4-Autopilot Installation

First, install PX4-Autopilot SITL (Software In The Loop).

1.  **Follow the Ubuntu development environment setup:**
    Visit and follow instructions at:
    [https://docs.px4.io/main/en/dev\_setup/dev\_env\_linux\_ubuntu.html](https://docs.px4.io/main/en/dev_setup/dev_env_linux_ubuntu.html)

2.  **Clone and build PX4-Autopilot:**

    ```bash
    git clone https://github.com/PX4/PX4-Autopilot.git
    cd PX4-Autopilot
    bash ./Tools/setup/ubuntu.sh
    ```

-----

## 2\. MAVSDK Installation

1.  **Clone MAVSDK repository:**
    ```bash
    git clone https://github.com/mavlink/MAVSDK
    cd MAVSDK
    ```
2.  **Initialize and update submodules:**
    ```bash
    git submodule update --init --recursive
    ```
3.  **Build MAVSDK:**
    ```bash
    cmake -DCMAKE_BUILD_TYPE=Debug -DBUILD_MAVSDK_SERVER=YES -Bbuild/default -H.
    cmake --build build/default -j8
    ```

-----

## 3\. gRPC Bridge Setup

1.  **Navigate to gRPC Bridge directory:**
    ```bash
    cd gRPCBridge/
    ```
2.  **Clone MAVSDK-Proto repository:**
    ```bash
    git clone https://github.com/mavlink/MAVSDK-Proto
    ```
3.  **Install required npm packages:**
    ```bash
    npm install @grpc/grpc-js
    npm install cors
    npm install express
    ```

-----

## 4\. Web Application Setup

1.  **Navigate to DHGCS directory:**
    ```bash
    cd DHGCS
    ```
2.  **Create new React application:**
    ```bash
    npx create-react-app your-app-name
    ```
3.  **Navigate to source directory:**
    ```bash
    cd your-app-name/src
    ```

### File Replacements

Replace the following files from the repository:

  * `App.css`
  * `App.js`

Copy the `components` folder from the repository to the `src` directory.

### Install Additional Requirements

1.  **Return to app root directory:**
    ```bash
    cd ..
    ```
2.  **Install `styled-components`:**
    ```bash
    npm install styled-components
    ```
3.  **Install any other dependencies that show up as errors during runtime:**
    ```bash
    npm install [package-name]
    ```

-----

## 5\. Running the Complete System

You'll need **4 separate terminal windows** to run all components simultaneously.

### Terminal 1 - PX4 SITL

```bash
cd PX4-Autopilot
make px4_sitl gz_x500
```

### Terminal 2 - MAVSDK Server

```bash
cd MAVSDK
./build/default/src/mavsdk_server/src/mavsdk_server udp://:14550 -p 50000
```

### Terminal 3 - gRPC Bridge

```bash
cd DHGCS/gRPCBridge
node ./src/mavsdk-rest.js
```

### Terminal 4 - React Web Application

```bash
cd your-app-name
npm start
```

-----

## Verification Steps

Check each terminal for successful startup:

  * **Terminal 1:** PX4 SITL should show simulation running.
  * **Terminal 2:** MAVSDK server should show connection status.
  * **Terminal 3:** gRPC bridge should show server started.
  * **Terminal 4:** React development server should launch.
  * Web browser should automatically open to `localhost:3000`.
  * Check the browser console for any errors.

-----

## Troubleshooting

  * If the web application fails to start, ensure all npm dependencies are installed.
  * Verify all ports are available (14550, 50000, and 3000).
  * Check if the MAVSDK server is properly connected to the PX4 SITL.
  * Ensure all repository files are correctly copied and placed in their respective directories.
  * For new dependency errors, install them using `npm install [package-name]`.

-----

## Directory Structure

```
Root/
├── PX4-Autopilot/
├── MAVSDK/
│   └── build/default/src/mavsdk_server/
├── DHGCS/
│   ├── gRPCBridge/
│   │   ├── MAVSDK-Proto/
│   │   └── src/
│   │       └── mavsdk-rest.js
│   └── your-app-name/
│       └── src/
│           ├── App.js
│           ├── App.css
│           └── components/
```
