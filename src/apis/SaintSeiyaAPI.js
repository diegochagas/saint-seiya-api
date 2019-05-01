import axios from 'axios';

export const clothsConst = () => {
  axios.get('/data/cloths-constellations.csv')
    .then(response => convertCSVToJSON(response.data))
    .catch(err => console.error(`Error: ${err}`));
}
  
const convertCSVToJSON = csvContent => {
  const content = JSON.stringify(csvContent);
  const arrayOfRows = content.split('\\r\\n'); 
  const columnsName = arrayOfRows[0].split(',').map(column => column.replace(`"`, ""));
  const rows = arrayOfRows.slice(1);
  const rowsSplitForValue = rows.map(row => row.split(','));
  const cloths = buildJSONObject(columnsName, rowsSplitForValue);
  /*let clients = [];
  let clientList = {};
  for(let i = 0; i < rows.length; i++){
    clientList = {};
    let items = rows[i].split(',');
    for(let j = 0; j < items.length; j++){
      clientList[`${columnsName[j]}`] = items[j];
    }
    clients.push(clientList);
  }
  console.log(clients);
  return clients;
 */
  console.log(cloths);
}

const buildJSONObject = (columnsName, rows) => {
  return rows.map(row => {
    const cloth = row.map((value, index) => {
      const information = `${columnsName[index]}" : "${value}`;
      return information;
    });
    const jsonObject = JSON.parse(`{${cloth}}`);
    console.log(jsonObject);
    return jsonObject;
  });
}