import axios from 'axios';

export const clothsConst = () => {
  const reader = new FileReader();
  axios.get('../apis/data/cloths-constellations.csv')
    .then(response => {
      reader.readAsText(response);
      reader.onload = event => {
        console.log(event.target.result);
      }
    }).catch(err => console.error(`Error: ${err}`));
}

const convertCSVToJSON = CSVContent => {
  const splitedBrokenLine = CSVContent.split('\n');
  const sizeWithOnlyCommas = 12;
  const columnsName = splitedBrokenLine[0].split(',');
  const rows = splitedBrokenLine.filter((row, index) => index >= 1 && row.length > sizeWithOnlyCommas);
  let clientList = {};
  let clients = [];
  for(let i = 1; i < rows.length; i++){
    clientList = {};
    let items = rows[i].split(',');
    for(let j = 0; j < items.length; j++){
      clientList[`${columnsName[j]}`] = items[j];
    }
    clients.push(clientList);
  }
  return clients;
}
