import styled from 'styled-components';

const Button = styled.button`
  color: darkred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid darkred;
  border-radius: 3px;
`;

function RTL_fetch() {
    fetch('http://localhost:8081/rtl', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
}


function RTL() {

    return (
        <div>
            <Button
                onClick={() => RTL_fetch()}>RTH </Button>
        </div>
    )
}

export default RTL
