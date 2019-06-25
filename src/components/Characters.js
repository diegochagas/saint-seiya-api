import React from 'react';
import { clothsConstellations } from '../apis/SaintSeiyaAPI';

class Characters extends React.Component {
  cloths = [];

  componentDidMount() {
    this.cloths = clothsConstellations;
  }

  getCharacterData(){
    const myNodeList = document.querySelectorAll(".portable-infobox .pi-data");
    let data = "";
    for(let i = 0; i < myNodeList.length; i++) {
      let value = myNodeList[i];
      data += `${value.querySelector(".pi-data-label").textContent}, ${value.querySelector(".pi-data-value").textContent}`;
      data += myNodeList.length - 1 === i ? "" : ", ";
    }
    return data;
  }

  render(){
    console.log(clothsConstellations);
    return(
      <div className="characters">
          <section className="saints">
            <h2>Saints</h2>
            <table className="cloths">
              <thead>
                <tr>
                  <th>Number</th>
                  <th>cloths</th>
                </tr>
              </thead>
              <tbody>
                {this.cloths.map((cloth, index) => {
                  return(
                    <tr key={cloth.id}>
                      <td>{index + 1}</td>
                      <td>{cloth.Name}</td>
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