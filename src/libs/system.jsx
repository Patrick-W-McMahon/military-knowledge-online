const formatNumber = (price, dec) => (parseFloat(price) || 0).toLocaleString("en-US", {
    minimumFractionDigits: dec || 0,
    maximumFractionDigits: dec || 0,
});

const padNum = (num, size) => {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

const getNodeByKey = (key, nodes) => nodes.find(node => node.node.key === key);
const getNodeById = (id, nodes) => nodes.find(node => node.id === id);

const getGroupObjs = data => {
    let groups = [];
    data.forEach(group => groups[group.fieldValue] = group.edges.map(item => item.node));
    return groups;
};

const flattenGroupNodes = data => {
    const { groups } = data;
    let results = [];
    groups.forEach(group => results[group.type] = group.nodes.map(item => item));
    return results;
};


const getGroupedArrs = src =>  {
    let results = {};
    src.group.forEach(elm => results[elm.fieldValue] = elm.edges ? elm.edges : elm.nodes ? elm.nodes : {...elm});
    return results;
}

const sourtContentBySlug = data => {
    let obj = {};
    data.forEach(item => obj[item.fields.slug] = item);
    return obj;
}

const capfirstWord = stg => `${stg[0].toUpperCase()}${stg.substring(1)}`;

const fetchErrHandler = (err, defaultVal) => {
    console.log('Fetch Error: ',err);
    return defaultVal;
}

export {
    formatNumber,
    padNum,
    getNodeByKey,
    getNodeById,
    getGroupObjs,
    flattenGroupNodes,
    capfirstWord,
    sourtContentBySlug,
    getGroupedArrs,
    fetchErrHandler
}