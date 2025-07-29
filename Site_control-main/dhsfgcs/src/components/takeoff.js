import styled from 'styled-components';

const Button = styled.button`
  color: darkred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid darkred;
  border-radius: 3px;
`;

function takeoffdrone() {
    fetch('http://localhost:8081/start', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
}


function takeoff() {

    return (
        <div>
            <Button
                onClick={() => takeoffdrone()}>Start </Button>
        </div>
    )
}

export default takeoff
