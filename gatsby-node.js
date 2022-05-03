const BRANCH_DATA = require('./static/data/branches.json');


exports.createPages = async({ actions }) => {
    const { createPage } = actions
    createPage({
        path: "/using-dsg",
        component: require.resolve("./src/templates/using-dsg.js"),
        context: {},
        defer: true,
    })
}


exports.sourceNodes = async({ actions: { createNode }, createContentDigest }) => {

    const dataArrSetup = (dataSet, id, type) => {
        dataSet.forEach((data, index) => {
            createNode({
                ...data,
                id: `${id}-${index}`,
                internal: {
                    type,
                    contentDigest: createContentDigest(data)
                }
            });
        });
    };

    const dataPointSetup = (dataSet, id) => {
        Object.keys(dataSet).forEach((key, index) => {
            const dataPoint = dataSet[key];
            createNode({
                key,
                points: [...dataSet[key]],
                id: `${id}-${key}-${index}`,
                internal: {
                    type: id,
                    contentDigest: createContentDigest(dataPoint)
                }
            });
        });
    };

    dataArrSetup(BRANCH_DATA, 'branches', 'branch');
}