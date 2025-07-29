import React, { useState, useEffect } from 'react';
import BatteryIndicator from './BatteryIndicator';
import styled from 'styled-components';

const PrettyText = styled.label`
  color: darkred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid darkred;
  border-radius: 3px;
`;

const batt_REST_ENDPOINT = "http://localhost:8081/battery";
const DEFAULT_POSITION_STATE = { "voltage_v": 0, "remaining_percent": 0 };

const Battery = () => {
    const [batval, setBatval] = useState(DEFAULT_POSITION_STATE);

    useEffect(() => {
        const timer = setInterval(async () => {
            try {
                const res = await fetch(batt_REST_ENDPOINT);
                if (res.ok) {
                    const newBatval = await res.json();
                    setBatval(newBatval);
                }
            } catch (error) {
                console.error("Failed to fetch battery data:", error);
            }
        }, 500);

        return () => clearInterval(timer);
    }, []);

    return (
        <div>

            <PrettyText>batt_level  ....  {batval.remaining_percent}%</PrettyText>

           
        </div>
    );
};

export default Battery;
