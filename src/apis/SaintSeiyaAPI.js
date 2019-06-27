import axios from 'axios';

export const clothsConstellations = async () => {
  const cloths = await axios.get('/data/cloths-constellations.csv')
    .then(response => convertCSVToObject(response.data))
    .catch(err => console.error(`Error: ${err}`));
  return cloths;
}
  
const convertCSVToObject = csvContent => {
  const content = JSON.stringify(csvContent);
  const arrayOfRows = content.split('\\r\\n'); 
  const cloths = buildClothArray(arrayOfRows);
  return cloths;
}

const getColumnNames = arrayOfRows => {
  arrayOfRows[0] = arrayOfRows[0].replace(`"`, '');
  return arrayOfRows[0].split(',');
}

const buildClothArray = arrayOfRows => {
  const rows = arrayOfRows.slice(1);
  const clothsValues = rows.map(row => row.split(','));
  const columnNames = getColumnNames(arrayOfRows);
  const cloths = fillClothsData(columnNames, clothsValues);
  return cloths;
}

const fillClothsData = (columnNames, clothsValues) => {
  return clothsValues.map(clothValues => {
    const cloth = {};
    clothValues.forEach((value, index) => {
      cloth[columnNames[index]] = value;
    });
    return cloth;
  });
}

const getCharacterLabels = () => {
  const myNodeList = document.querySelectorAll(".portable-infobox .pi-data .pi-data-label");
  let headers = "";
  for(let i = 0; i < myNodeList.length; i++) {
      let element = myNodeList[i];
      headers += `${element.innerText.replace(/(?:\r\n|\r|\n)/g, ' | ').replace(/,/g, " /")},`;
  }
  return headers; 
}; console.clear(); getCharacterLabels();

const getCharacterValues = () => {
  let characterLabels =  ["age", "gender", "birth", "nationality", "affiliation", "class", "rank", "cloth", "training", "master", "attacks", "height", "weight", "family", "apprentice"];
  const values = characterLabels.reduce((previousValue, label) => {
      const element = document.querySelector(`[data-source="${label}"] .pi-data-value`);
      let actualValue = element === null ? element : element.innerText.replace(/(?:\r\n|\r|\n)/g, ' | ').replace(/,/g, " /");
      return `${previousValue},${actualValue}`;
  }, "");
  return values;
}; console.clear(); getCharacterValues();