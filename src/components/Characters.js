import React from 'react';
import { constellations } from '../apis/constellations';


class Characters extends React.Component {
  render(){
    return(
      <div className="characters">
          <section className="saints">
            <h2>Saints</h2>
            <table className="constellations">
              <thead>
                <th>Constellation</th>
              </thead>
              <tbody>
                {constellations.map(constellation => {
                  return(
                    <tr>
                      <td>{constellation.Name}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
        </section>
      </div>
    );
  }
}

export default Characters;