const BRANCH_DATA = require('./static/data/branches.json');
const LINKS_AIR_FORCE = require('./static/data/links_air_force.json');
const LINKS_ARMY = require('./static/data/links_army.json');
const LINKS_COAST_GUARD = require('./static/data/links_coast_guard.json');
const LINKS_MARINE_CORPS = require('./static/data/links_marine_corps.json');
const LINKS_NATIONAL_GUARD = require('./static/data/links_national_guard.json');
const LINKS_NAVY = require('./static/data/links_navy.json');
const LINKS_SPACE_FORCE = require('./static/data/links_space_force.json');

const LinkSources = {
    air_force: LINKS_AIR_FORCE,
    army: LINKS_ARMY,
    cost_guard: LINKS_COAST_GUARD,
    marine_corps: LINKS_MARINE_CORPS,
    national_guard: LINKS_NATIONAL_GUARD,
    navy: LINKS_NAVY,
    space_force: LINKS_SPACE_FORCE
};
var links = [];
const getFirstLetter = (str) => str[0].toLowerCase();
BRANCH_DATA.forEach(branch => {
    LinkSources[branch.path].forEach(link => links.push({...link, branch: branch.path }));
});
links = links.map(link => {
    const alphaChar = getFirstLetter(link.title);
    return {...link, alphaChar };
});
const LINKS_DATA = links;




exports.createPages = async({ actions }) => {
    const { createPage } = actions
    createPage({
        path: "/using-dsg",
        component: require.resolve("./src/templates/using-dsg.js"),
        context: {},
        defer: true
    });

    BRANCH_DATA.forEach(branch => {
        createPage({
            path: `/branch/${branch.path}`,
            component: require.resolve("./src/templates/branch.jsx"),
            context: { branch: branch.path }
        });
    });
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
    dataArrSetup(LINKS_DATA, 'links_data', 'links_data');
}