//const path = require('path');
const crypto = require('crypto');
const fs = require('fs');
const fse = require("fs-extra");
const { readdir, stat } = require("fs").promises;
const path = require('path');

const BRANCH_DATA = require('./static/data/branches.json');
const BASE_GROUP_FILTERS = require('./static/system/base_group_filters.json');
const MAIN_SIDEBAR_DATA = require('./static/data/mainSidebarData.json');

const LINKS_AIR_FORCE = require('./static/data/links_air_force.json');
const LINKS_ARMY = require('./static/data/links_army.json');
const LINKS_COAST_GUARD = require('./static/data/links_coast_guard.json');
const LINKS_MARINE_CORPS = require('./static/data/links_marine_corps.json');
const LINKS_NATIONAL_GUARD = require('./static/data/links_national_guard.json');
const LINKS_NAVY = require('./static/data/links_navy.json');
const LINKS_SPACE_FORCE = require('./static/data/links_space_force.json');

const CATEGORIES_ARMY = require('./static/data/categories_army.json');

const ARMY_DOCUMENTS = require('./static/data/documents/army_documents.json');

const FORMS_LIST = require('./static/data/forms_list.json');

const SHOPS_LIST = require('./static/data/shops.json');

let links = [];
let categories = [];
let linksMenu = [];

function getFileExtension(str) {
    var regex = /\.[^.\\/:*?"<>|\r\n]+$/;  // Regular expression for file extension
    var match = regex.exec(str);  // Execute the regex on the string
    if (match !== null) {
      return match[0].substring(1); // Return the matched file extension
    } else {
      return null; // No file extension found
    }
}

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
const setupCategories = (categories, filter) => {
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
        const { func, obj, val } = f.action;
        const fa = {...f, action: { func, obj, val, filter } };
        categoryList.push(fa);
        order++;
    });
    orderedCategories.forEach(f => {
        const { func, obj, val } = f.action;
        const fa = {...f, action: { func, obj, val, filter } };
        categoryList.push({...fa, order });
        order++;
    });
    return categoryList;
}

const LinkSources = {
    air_force: LINKS_AIR_FORCE,
    army: LINKS_ARMY,
    coast_guard: LINKS_COAST_GUARD,
    marine_corps: LINKS_MARINE_CORPS,
    national_guard: LINKS_NATIONAL_GUARD,
    navy: LINKS_NAVY,
    space_force: LINKS_SPACE_FORCE
};

const categories_sources = {
    air_force: [],
    army: CATEGORIES_ARMY,
    coast_guard: [],
    marine_corps: [],
    national_guard: [],
    navy: [],
    space_force: []
}

const setupFilters = (toplevel, categories, filter) => [
    { hash: sha256(`${toplevel}_quick_links`), label: `${toplevel} Quick Links`, action: { obj: "links-action", func: "getLinksByTags", val: ["quick_links"], filter } },
    ...categories.map(l => ({ hash: sha256(JSON.stringify(l)), label: l.label, action: {...l.action, filter } }))
];

let MilitaryBranchNodes = BRANCH_DATA.map(branch => {
    const { name, seal, path } = branch;
    return { hash: sha256(path), label: name, seal, nodes: setupFilters(name, categories_sources[path], path), action: { obj: "links-action", func: "getAllLinks", val: sha256(path), filter: path } };
});

/*let MilitaryBranchNodes = [
    { key: sha256('air_force'), label: 'Air Force', nodes: setupFilters('Air Force', [], 'air_force'), action: { obj: "links-action", func: "getAllLinks", val: sha256('air_force'), filter: 'air_force' } },
    { key: sha256('army'), label: 'Army', nodes: setupFilters('Army', CATEGORIES_ARMY, 'army'), action: { obj: "links-action", func: "getAllLinks", val: sha256('army'), filter: 'army' } },
    { key: sha256('coast_guard'), label: 'Coast Guard', nodes: setupFilters('Coast Guard', [], 'coast_guard'), action: { obj: "links-action", func: "getAllLinks", val: sha256('coast_guard'), filter: 'coast_guard' } },
    { key: sha256('marine_corps'), label: 'Marine Corps', nodes: setupFilters('Marine Corps', [], 'marine_corps'), action: { obj: "links-action", func: "getAllLinks", val: sha256('marine_corps'), filter: 'marine_corps' } },
    { key: sha256('national_guard'), label: 'National Guard', nodes: setupFilters('National Guard', [], 'national_guard'), action: { obj: "links-action", func: "getAllLinks", val: sha256('national_guard'), filter: 'national_guard' } },
    { key: sha256('navy'), label: 'Navy', nodes: setupFilters('Navy', [], 'navy'), action: { obj: "links-action", func: "getAllLinks", val: sha256('navy'), filter: 'navy' } },
    { key: sha256('space_force'), label: 'Space Force', nodes: setupFilters('Space Force', [], 'space_force'), action: { obj: "links-action", func: "getAllLinks", val: sha256('space_force'), filter: 'space_force' } },
];*/


linksMenu = [
    { hash: sha256('favorites'), label: 'Favorites', action: { obj: "profile-action", func: "getFavLinks", val: '' } },
    { hash: sha256('all_branches'), label: 'Military', nodes: MilitaryBranchNodes, action: { obj: "links-action", func: "getAllBranches", val: '' } },
    { hash: sha256('civilian'), label: 'Civilian', nodes: [], action: { obj: "links-action", func: "getAllCivilian", val: '' } }
];

const categoriesSources = {
    air_force: setupCategories([], 'air_force'),
    army: setupCategories(CATEGORIES_ARMY, 'army'),
    coast_guard: setupCategories([], 'coast_gaurd'),
    marine_corps: setupCategories([], 'marine_corps'),
    national_guard: setupCategories([], 'national_guard'),
    navy: setupCategories([], 'navy'),
    space_force: setupCategories([], 'space_force')
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

const getApplicationData = async() => {
    const appDir = await getDirectories('./src/applications/');
    let applications = [];
    appDir.forEach(async(appDir, index) => {
        const templatePath = `./src/applications/${appDir}/index.jsx`;
        const appURI = `/apps/${appDir}`;
        const appRootPath = `./src/applications/${appDir}`;
        const configFileName = 'info.json';
        const config = await fs.readFileSync(`${appRootPath}/${configFileName}`);

        applications.push({
            hash: sha256(JSON.stringify(`${appDir}-${config}`)),
            config,
            appDir,
            appURI,
            appRootPath,
            configFileName,
            id: `${appDir}-${index}`,
            templatePath
        });
    });
    return applications;
}


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
//TODO: all of this needs to be reviewed as some of these pages will not exist anymore.
exports.createPages = async({ actions }) => {
    const { createPage } = actions;
    /*
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
    FORMS_LIST.forEach(form => {
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
    */
   const appData =  await getApplicationData();
   console.log('appData', appData);
   appData.forEach(async(application, index) => {
        const { appURI, templatePath, config, appDir, appRootPath, configFileName } = application;
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

    //dataArrSetup(BRANCH_DATA, 'branches', 'branch');
    dataArrSetup(LINKS_DATA, 'links_data', 'links_data');
    dataArrSetup(CATEGORIES_DATA, 'categories_data', 'categories_data');

    ARMY_DOCUMENTS.forEach(async(doc, index) => {
        let docType = null;
        let fileType = '';
        let docError = false;
        let errorMsg = '';
        switch(doc.pdfLink.substring(0, 4)) {
            case 'http':
                docType = 'document-link';
                const fileExt = getFileExtension(doc.pdfLink);
                switch(fileExt) {
                    case 'pdf':
                        fileType = fileExt.toUpperCase();
                    break;
                    default:
                        fileType = 'unknown';
                    break;
                }
            break;
            case 'CERT':
            case 'CCER':
            case 'EGA':
            case 'CD':
            case 'BKST':
            case 'PDST':
            case 'CTN':
            case 'PK10':
            case 'CS':
            case 'EN':
            case 'TGST':
            case 'CSST':
            case 'TCBX':
            case 'CDWF':
            case 'CSTG':
            case 'EFIL':
            case 'BKL':
            case 'SG':
            case 'FL':
            case 'CSFL':
            case 'BK':
            case 'CSCT':
            case 'TG':
            case 'ENFL':
            case 'CARD':
                docType = doc.pdfLink;
            break;
            default:
                docError = true;
                errorMsg = 'unknown document';
                docType=doc.pdfLink === "" ? 'missing' : doc.pdfLink;
            break;
        }
        let document = docError ? {...doc, pdfLink: null} : doc;
        createNode({
            hash: sha256(JSON.stringify(document)),
            ...document,
            nav: 'military/army',
            id: `document-army-${index}`,
            type: docType,
            fileType,
            docError: {
                error: docError,
                message: errorMsg
            },
            internal: {
                type: 'document',
                contentDigest: createContentDigest(document)
            }
        });
    });


    linksMenu.forEach(async(data, index) => {
        createNode({
            index,
            hash: sha256(JSON.stringify(data)),
            ...data,
            id: `${sha256(JSON.stringify(data))}-${index}`,
            nodes: data.nodes ? [...data.nodes] : [],
            internal: {
                type: 'linkMenuData',
                contentDigest: createContentDigest(data)
            }
        });
    });

    dataArrSetup(MAIN_SIDEBAR_DATA, 'sidebarLinks', 'sidebarLink');
    dataArrSetup(SHOPS_LIST, 'shopLinks', 'shopLink');

    const appData = await getApplicationData();
    appData.forEach(async(application, index) => {
        const { appURI, config, appDir, appRootPath, configFileName, id } = application;
        createNode({
            hash: sha256(JSON.stringify(`${appDir}-${config}`)),
            ...JSON.parse(config),
            dir: appDir,
            appURI,
            appRootPath,
            configFileName,
            id,
            internal: {
                type: 'application',
                contentDigest: createContentDigest(config)
            }
        });
    });
    /*
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
    */
    FORMS_LIST.forEach(async(formItem, index) => {
        if(formItem.type === 'internal') {
            return;
        }
        createNode({
            hash: sha256(JSON.stringify(`${formItem} - ${index}`)),
            ...formItem,
            id: `form-item-${index}`,
            internal: {
                type: 'formItems',
                contentDigest: createContentDigest(formItem)
            }
        });
    });
}