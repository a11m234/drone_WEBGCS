import styled from 'styled-components';

const Button = styled.button`
  color: ornage;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid darkred;
  border-radius: 3px;
`;

function hold() {
    fetch('http://localhost:8081/hold', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
}


function HoldButton() {

    return (
        <div>
            <Button
                onClick={() => hold()}>Drone Position hold </Button>
        </div>
    )
}

export default HoldButton
