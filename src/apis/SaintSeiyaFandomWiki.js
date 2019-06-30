const getCharacterLabels = () => {
    const myNodeList = document.querySelectorAll(".portable-infobox .pi-data .pi-data-label");
    let headers = "";
    for(let i = 0; i < myNodeList.length; i++) {
        let element = myNodeList[i];
        headers += `${element.innerText.replace(/(?:\r\n|\r|\n)/g, ' | ').replace(/,/g, " /")},`;
    }
    return headers; 
}; console.clear(); getCharacterLabels();

const labels = [
    "age",
    "gender",
    "birth",
    "nationality",
    "affiliation",
    "class",
    "rank",
    "cloth",
    "training",
    "apprentice",
    "master",
    "attacks",
    "height",
    "weight",
    "family",
    "blood"
];

const selectors1 = {
    [labels[0]]: "[data-source='age'] .pi-data-value",
    [labels[1]]: "[data-source='gender'] .pi-data-value",
    [labels[2]]: "[data-source='birth'] .pi-data-value",
    [labels[3]]: "[data-source='nationality'] .pi-data-value",
    [labels[4]]: "[data-source='affiliation'] .pi-data-value",
    [labels[5]]: "[data-source='class'] .pi-data-value",
    [labels[6]]: "[data-source='rank'] .pi-data-value",
    [labels[7]]: "[data-source='cloth'] .pi-data-value",
    [labels[8]]: "[data-source='training'] .pi-data-value",
    [labels[9]]: "[data-source='apprentice'] .pi-data-value",
    [labels[10]]: "[data-source='master'] .pi-data-value",
    [labels[11]]: "[data-source='attacks'] .pi-data-value",
    [labels[12]]: "[data-source='height'] .pi-data-value",
    [labels[13]]: "[data-source='weight'] .pi-data-value",
    [labels[14]]: "[data-source='family'] .pi-data-value",
    [labels[15]]: "[data-source='blood'] .pi-data-value"
};

const selectors2 = {
    [labels[0]]: "#infoboxinternal > table > tbody > tr:nth-child(38) > td.infoboxcell",
    [labels[1]]: "#infoboxinternal > table > tbody > tr:nth-child(40) > td.infoboxcell",
    [labels[2]]: "#infoboxinternal > table > tbody > tr:nth-child(46) > td.infoboxcell",
    [labels[3]]: "#infoboxinternal > table > tbody > tr:nth-child(41) > td.infoboxcell",
    [labels[4]]: "#infoboxinternal > table > tbody > tr:nth-child(10) > td.infoboxcell",
    [labels[5]]: "#infoboxinternal > table > tbody > tr:nth-child(9) > td.infoboxcell",
    [labels[6]]: "#infoboxinternal > table > tbody > tr:nth-child(9) > td.infoboxcell",
    [labels[7]]: "#infoboxinternal > table > tbody > tr:nth-child(11) > td.infoboxcell",
    [labels[8]]: "#infoboxinternal > table > tbody > tr:nth-child(11) > td.infoboxcell",
    [labels[9]]: "#infoboxinternal > table > tbody > tr:nth-child(50) > td.infoboxcell",
    [labels[10]]: "#infoboxinternal > table > tbody > tr:nth-child(49) > td.infoboxcell",
    [labels[11]]: "#infoboxinternal > table > tbody > tr:nth-child(35) > td.infoboxcell",
    [labels[12]]: "#infoboxinternal > table > tbody > tr:nth-child(47) > td.infoboxcell",
    [labels[13]]: "#infoboxinternal > table > tbody > tr:nth-child(48) > td.infoboxcell",
    [labels[14]]: "[data-source='family'] .pi-data-value",
    [labels[15]]: "#infoboxinternal > table > tbody > tr:nth-child(44) > td.infoboxcell"
};

const selectors3 = {
    [labels[0]]: "#mw-content-text > table > tbody > tr:nth-child(5) > td:nth-child(2)",
    [labels[1]]: "#mw-content-text > table > tbody > tr:nth-child(4) > td:nth-child(2)",
    [labels[2]]: "#mw-content-text > table > tbody > tr:nth-child(6) > td:nth-child(2)",
    [labels[3]]: "#mw-content-text > table > tbody > tr:nth-child(17) > td:nth-child(1)",
    [labels[4]]: "#mw-content-text > table > tbody > tr:nth-child(14) > td:nth-child(2)",
    [labels[5]]: "#mw-content-text > table > tbody > tr:nth-child(9) > td:nth-child(2)",
    [labels[6]]: "#mw-content-text > table > tbody > tr:nth-child(9) > td:nth-child(2)",
    [labels[7]]: "#mw-content-text > table > tbody > tr:nth-child(10) > td:nth-child(2)",
    [labels[8]]: "null",
    [labels[9]]: "null",
    [labels[10]]: "#mw-content-text > table > tbody > tr:nth-child(13) > td:nth-child(2)",
    [labels[11]]: "null",
    [labels[12]]: "#mw-content-text > table > tbody > tr:nth-child(7) > td:nth-child(2)",
    [labels[13]]: "#mw-content-text > table > tbody > tr:nth-child(8) > td:nth-child(2)",
    [labels[14]]: "#mw-content-text > table > tbody > tr:nth-child(15) > td:nth-child(2)",
    [labels[15]]: "null"
};

const getCharacterValues = (labels, selectors) => {
    const values = labels.reduce((previousValue, label) => {
        const element = document.querySelector(selectors[label]);
        let actualValue = element === null ? element : element.innerText.replace(/(?:\r\n|\r|\n)/g, ' | ').replace(/,/g, " / ");
        actualValue = actualValue === " | " ? null : actualValue; 
        return `${previousValue},${actualValue}`;
    }, "");
    return values;
}; console.clear();
//getCharacterValues(labels, selectors1);
getCharacterValues(labels, selectors2);
//getCharacterValues(labels, selectors3);
  