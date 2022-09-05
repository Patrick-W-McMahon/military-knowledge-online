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