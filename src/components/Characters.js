import React from 'react';
import { constellations } from '../apis/constellations';


class Characters extends React.Component {
  render(){
    return(
      <div className="characters">
        <section className="constellations">
          Saints: {constellations.length}
        </section>
      </div>
    );
  }
}

export default Characters;