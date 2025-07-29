import './App.css';
import Start from './components/takeoff';
import DisarmButton from './components/disarmButton';

import LandButton from './components/landButton';
import HoldButton from './components/holdbutton';
import GpsCoords from './components/gpsCoords';
import MapComponent from './components/MapComponent';
import RTL from './components/RTL';
import  Battery  from './components/batt_level';
import { useState } from 'react';

function App() {
  
  const [gpsCoordinates, setGpsCoordinates] = useState({
    lat:  16.472429169395063,
    lng: 80.71801059545717,
  });

  const handleGpsUpdate = (coords) => {
    setGpsCoordinates(coords);
  };

    
  return (
  
    <div className="App">
      <div className="map-container"> {/* Add a container for the map and buttons */}
        <div className="buttons-overlay"> {/* Add an overlay for the buttons */}
          <Start />
          <DisarmButton />
       </div>
        <div className="info">
          {/* <GpsCoords /> */}

          <Battery />
        </div>

        <div className='critical'>
        <LandButton />
        <HoldButton />
        <RTL />
        </div>
        <div className='head'>
        <h2>DH_SH_WEBGCS</h2>
        </div>

        <GpsCoords onGpsUpdate={handleGpsUpdate} />
        <MapComponent lat={gpsCoordinates.lat} lng={gpsCoordinates.lng} />
      </div>
    </div>
  );
}

export default App;


