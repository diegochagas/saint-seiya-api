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
                <th>Number</th>
                <th>Constellations</th>
              </thead>
              <tbody>
                {constellations.map((constellation, index) => {
                  return(
                    <tr>
                      <td>{index + 1}</td>
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