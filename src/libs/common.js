export const abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

export const flattenLinksList = linksList => {
    let flatList = [];
    linksList.forEach(g => {
        g.links.forEach(l => {
            flatList.push(l);
        });
    });
    return flatList;
}

export const getActiveLinks = (allLinksData, selectedTreeData) => {
    //console.log('>>allLinksData: ', allLinksData);
    //console.log('>>selectedTreeData: ', selectedTreeData);
    const { func, filter } = selectedTreeData.action;
    if (func === 'getAllLinks') {
        //console.log('all: ', allLinksData);
        return allLinksData.filter(g => g.group === filter)[0] || { group: filter, groupLinks: [], links: [] };
    }
    const activeGroup = allLinksData.filter(g => g.group === filter)[0];
    //console.log('activeGroup: ', activeGroup);
    if (activeGroup === undefined) {
        return { group: null, groupLinks: [], links: [] }
    }
    const { group, links } = activeGroup; //groupLinks,
    //console.table("links: ", links);
    //const activeGroupLinks = [];
    /*groupLinks.map(g => {
            const { fieldValue, links } = g;
            const activeLinks = links.filter(l => l.categories.some(s => selectedTreeData.action.val.includes(s)));
            return { fieldValue, links: activeLinks }
        });*/
    const filterLinksDataVal = selectedTreeData.action.val;
    const activeLinks = links.filter(l => {
        const { categories } = l;
        if (categories === null) {
            return false;
        }
        return filterLinksDataVal.some(f => [...categories].includes(f));
    });
    /*
    let activeLinks = links.filter(l => {
        [...l.categories].forEach(c => {
            console.log('c: ', c);
            [...c].forEach(i => {
                if (filterLinksDataVal.includes(i)) {
                    return true;
                }
            });
        });
        return false;
    });*/
    //links.filter(l => selectedTreeData.action.val.some(s => l.categories.includes(s)));
    //links.filter(l => l.categories.findIndex(e => selectedTreeData.action.val.includes(e)) > -1);

    //console.log('results: ', { group, groupLinks: activeGroupLinks, links: activeLinks });
    return { group, groupLinks: [], links: activeLinks };
}

export const filterFavLinks = linksList => linksList.map(g => {
    let links = [];
    if (g !== undefined && g.links !== undefined) {
        links = g.links.filter(l => l.fav);
    }
    return {...g, links };
});

export const filterActiveLinks = linksList => linksList.map(g => {
    let links = [];
    if (g !== undefined && g.links !== undefined) {
        links = g.links.filter(l => l.active);
    }
    return {...g, links };
});

export const getEventMessage = () => {
    const dt = new Date();
    const m = dt.getMonth();
    const d = dt.getDate();
    const y = dt.getFullYear();
    switch (m) {
        case 0:
            if (d === 1) return "Happy New Year";
            if ((d === 16 && y === 2023) || (d === 15 && y === 2024) || (d === 20 && y === 2025)) return "It is currently Martin Luther King Jr Day";
            break;
        case 1:
            return "It is currently African American Black History Month";
        case 2:
            return "It is currently Women's History Month";
        case 3:
            if (d === 2) return "It is Volunteer Appreciation Week";
            if (d === 5) return "It is Gold Star Spouses Day";
            if (d === 22) return "It is Earth Day!";
            if (d === 23) return "Happy Birthday Army Reserves!";
            if (d === 28) return "Days of Remembrance of the Victims of the Holocaust";
            return "It is the Month of the Military Child and National Sexual Assault Awareness and Prevention Month.";
        case 4:
            if (d === 4) return "It is currently National Day of Prayer and Asian American Pacific Islander Heritage Month";
            if (d === 6) return "It is Military Spouse Appreciation Day! It is currently Asian American Pacific Islander Heritage Month";
            if (d === 30) return "It is currently Memorial Day and Asian American Pacific Islander Heritage Month";
            return "It is currently Asian American Pacific Islander Heritage Month";
        case 5:
            if (d === 14) return "Happy Birthday Army! It is currently Army Heritage and LGBTQ+ Pride Month";
            if (d === 19) return "Happy Juneteenth! It is currently Army Heritage and LGBTQ+ Pride Month";
            return "It is currently Army Heritage and LGBTQ+ Pride Month";
        case 6:
            if (d === 4) return "Happy Independence Day";
            break;
        case 7:
            if (d === 26) return "Happy Women's Equality Day! It is Currently Antiterrorism Awareness Awareness Month";
            return "It is Currently Antiterrorism Awareness Awareness Month";
        case 8:
            if (d === 11) return "It is currently Patriot day";
            if (d === 18) return "Happy Birthday Air Force! It is currently Hispanic Heritage and Suicide Prevention Month";
            if (d >= 15) return "It is currently Hispanic Heritage and Suicide Prevention Month";
            return "It is currently Suicide Prevention Month";
        case 9:
            if (d === 13) return "Happy Birthday Navy! It is currently Hispanic Heritage, Army Cybersecurity Awarenes, National Energy Action, and Disability Awareness Month Month";
            if (d <= 15) return "It is currently Hispanic Heritage, Army Cybersecurity Awarenes, National Energy Action, and Disability Awareness Month";
            return "It is currently Army Cybersecurity Awarenes, National Energy Action, and Disability Awareness Month";
        case 10:
            if (d === 10) return "Happy Birthday Marines! It is currently Miltary Family, Native American and Alaskan Heritage Month";
            if (d === 11) return "It is currently Veterans Day! It is currently Miltary Family, Native American and Alaskan Heritage Month";
            return "It is currently Miltary Family, Native American and Alaskan Heritage Month";
        case 11:
            if (d === 13) return "Happy Birthday National Guard!";
            if (d === 20) return "Happy Birthday Space Force!";
            if (d === 25) return "Happy Holidays";
            if (d === 31) return "New Years Eve";
            break;
        default:
            return false;
    }
}