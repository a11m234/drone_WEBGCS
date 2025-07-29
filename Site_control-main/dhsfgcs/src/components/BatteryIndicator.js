import React, { useState, useEffect } from 'react';

import styled from 'styled-components';

const PrettyText = styled.label`
  color: darkred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid darkred;
  border-radius: 3px;
`;

const batt_REST_ENDPOINT = "http://localhost:8081/battery"
const DEFAULT_POSITION_STATE = {"voltage_v":0,"remaining_percent":0}

function Battery() {

    const [batval, setbatval] = useState(DEFAULT_POSITION_STATE)

    useEffect( () => {
        
        const timer = setInterval(async () => {
            const res = await fetch(batt_REST_ENDPOINT);
            const newbatval = await res.json();
            setbatval(newbatval)
        }, 500);

        return () => clearInterval(timer);
    },[]);

    return (
        <div>
            <PrettyText>{batval.voltage_v},{batval.remaining_percent}</PrettyText>
        </div>
    )
}

export default Battery
