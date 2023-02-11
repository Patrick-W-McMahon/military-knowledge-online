//const path = require('path');
const crypto = require('crypto');
const fs = require('fs');
const fse = require("fs-extra");
const { readdir, stat } = require("fs").promises;
const path = require('path');

const BRANCH_DATA = require('./static/data/branches.json');
const BASE_GROUP_FILTERS = require('./static/system/base_group_filters.json');

const LINKS_AIR_FORCE = require('./static/data/links_air_force.json');
const LINKS_ARMY = require('./static/data/links_army.json');
const LINKS_COAST_GUARD = require('./static/data/links_coast_guard.json');
const LINKS_MARINE_CORPS = require('./static/data/links_marine_corps.json');
const LINKS_NATIONAL_GUARD = require('./static/data/links_national_guard.json');
const LINKS_NAVY = require('./static/data/links_navy.json');
const LINKS_SPACE_FORCE = require('./static/data/links_space_force.json');

const CATEGORIES_ARMY = require('./static/data/categories_army.json');

const APP_FORMS = require('./static/data/app_forms.json');

let links = [];
let categories = [];

async function getDirectories(path) {
    let filesAndDirectories = await fse.readdir(path);
    let directories = [];
    await Promise.all(
        filesAndDirectories.map(name => {
            return fse.stat(path + name)
                .then(stat => {
                    if (stat.isDirectory()) directories.push(name)
                })
        })
    );
    return directories;
}
const sha256 = x => crypto.createHash('sha256').update(x, 'utf8').digest('hex');
const setupCategories = (categories) => {
    let categoryList = [];
    let order = 0;
    const orderedCategories = categories.sort((a, b) => {
        if (a.label < b.label) {
            return -1;
        }
        if (a.label > b.label) {
            return 1;
        }
        return 0;
    });
    BASE_GROUP_FILTERS.forEach(f => {
        categoryList.push(f);
        order++;
    });
    orderedCategories.forEach(f => {
        categoryList.push({...f, order });
        order++;
    });
    return categoryList;
}

const LinkSources = {
    air_force: LINKS_AIR_FORCE,
    army: LINKS_ARMY,
    cost_guard: LINKS_COAST_GUARD,
    marine_corps: LINKS_MARINE_CORPS,
    national_guard: LINKS_NATIONAL_GUARD,
    navy: LINKS_NAVY,
    space_force: LINKS_SPACE_FORCE
};

const categoriesSources = {
    air_force: setupCategories([]),
    army: setupCategories(CATEGORIES_ARMY),
    cost_guard: setupCategories([]),
    marine_corps: setupCategories([]),
    national_guard: setupCategories([]),
    navy: setupCategories([]),
    space_force: setupCategories([])
};
//console.log('category test', categoriesSources);
const getFirstLetter = (str) => str[0].toLowerCase();
BRANCH_DATA.forEach(branch => {
    LinkSources[branch.path].forEach(link => links.push({...link, branch: branch.path }));
    categoriesSources[branch.path].forEach(category => categories.push({...category, branch: branch.path }));
});
links = links.map(link => {
    const alphaChar = getFirstLetter(link.title);
    return {...link, alphaChar, active: true };
});

const LINKS_DATA = links;
const CATEGORIES_DATA = categories;

/*
module.exports.onCreateNode = ({ node, actions }) => {
    const { createNodeField } = actions;
    if (node.internal.type === 'MarkdownRemark') {
        const slug = path.basename(node.fileAbsolutePath, '.md');
        createNodeField({
            node,
            name: 'slug',
            value: slug
        })
    }
};
*/
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
    APP_FORMS.forEach(form => {
        createPage({
            path: `/forms/${form.path}`,
            component: require.resolve("./src/templates/forms.jsx"),
            context: { title: form.title, fields: form.fields }
        });
    });
    const appDir = await getDirectories('./src/applications/');
    appDir.forEach(async(appDir, index) => {
        const templatePath = `./src/applications/${appDir}/index.jsx`;
        const appURI = `/apps/${appDir}`;
        const appRootPath = `./src/applications/${appDir}`;
        const configFileName = 'info.json';
        const config = await fs.readFileSync(`${appRootPath}/${configFileName}`);

        createPage({
            path: appURI,
            component: require.resolve(templatePath),
            context: {...JSON.parse(config), dir: appDir, appRootPath, configFileName, id: `${appDir}-${index}`, hash: sha256(JSON.stringify(`${appDir}-${config}`)) }
        });
    });
}


exports.sourceNodes = async({ actions: { createNode }, createContentDigest }) => {

    const dataArrSetup = (dataSet, id, type) => {
        dataSet.forEach((data, index) => {
            createNode({
                hash: sha256(JSON.stringify(data)),
                ...data,
                id: `${id}-${index}`,
                internal: {
                    type,
                    contentDigest: createContentDigest(data)
                }
            });
        });
    };
    /*
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
    */
    dataArrSetup(BRANCH_DATA, 'branches', 'branch');
    dataArrSetup(LINKS_DATA, 'links_data', 'links_data');
    dataArrSetup(CATEGORIES_DATA, 'categories_data', 'categories_data');

    const appDir = await getDirectories('./src/applications/');
    appDir.forEach(async(appDir, index) => {
        const appRootPath = `./src/applications/${appDir}`;
        const configFileName = 'info.json';
        const config = await fs.readFileSync(`${appRootPath}/${configFileName}`);
        const appURI = `/apps/${appDir}`;

        createNode({
            hash: sha256(JSON.stringify(`${appDir}-${config}`)),
            ...JSON.parse(config),
            dir: appDir,
            appURI,
            appRootPath,
            configFileName,
            id: `${appDir}-${index}`,
            internal: {
                type: 'application',
                contentDigest: createContentDigest(config)
            }
        });
    });
}