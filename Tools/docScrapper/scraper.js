const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const sleep = ms => new Promise((resolve) => setTimeout(resolve, ms));

let listData=[];
let docLinks = [];
(async ({URLs, files}) => {
  // Load documentsList.json into listData
  await fs.access(files[0], fs.constants.F_OK, async (err) => {
    if(err) {
      console.log('documentsList.json doesn\'t exist creating file');
      for (const url of URLs) {
        listData = [...listData, ...await getLists(url)];
      }
      await saveData(files[0], listData);
    } else {
      console.log('found documentsList.json loading data.');
      await loadData(files[0], async listData => {
        await fs.access(files[1], fs.constants.F_OK, async (err) => {
          if(err) {
            console.log('dataSet.json doesn\'t exist creating file');
            docLinks = listData.map((url,index) => ({
              index,
              num: null,
              date: null,
              title: null,
              pdfLink: null,
              proponent: null,
              status: null,
              directive: null,
              footnotes: null,
              pageUrl: `https://armypubs.army.mil/ProductMaps/PubForm/${url}`
            }));
            await saveData(files[1], docLinks);
          } else {
            console.log('found dataSet.json loading data.');
            await loadData(files[1], async dataSet => {
              let dataSetMem = dataSet;
              for(let i=0; i<dataSet.length;i++){
                showProgressBar(i, dataSetMem.length);
                if(await hasNullProps(dataSetMem[i])) {
                  console.log(' scrapping data: ', dataSetMem[i].pageUrl);
                  try {
                    const response = await axios.get(dataSetMem[i].pageUrl);
                    if (response.status === 200) {
                      const html = response.data;
                      const dom = cheerio.load(html);
                      dataSetMem[i] = await dataConverter(dom,dataSetMem[i]);
                    }
                  } catch (error) {
                    console.log('An error occurred:', error);
                  }
                  await sleep(2000);
                }
              }
              console.log('\nFinished Scrapping. \nSaving data to dataSet.json');
              await saveData(files[1],dataSetMem);
            });
          }
        });
      });
    }
  });
  
  async function hasNullProps(obj) {
    let results = false;
    await Object.keys(obj).forEach(prop => {
      const val = obj[prop];
      if(val === null || val === "null") {
        results = true;
      }
    });
    return results;
  }
  
  async function dataConverter(dom,obj) {
    await dom('#MainContent_tblContainer1').first().find('tr').each((i, tr) => {
      const tdElements = dom(tr).find('td');
      const label = dom(tdElements[0]).text().trim().toLowerCase();
      const val = dom(tdElements[1]).text();
      switch(label) {
        case "pub/form number":
          obj.num = val;
          break;
        case 'pub/form date':
          obj.date = val;
          break;
        case 'pub/form title':
          obj.title = val;
          break;
        case 'unit of issue(s)':
          if(dom(tdElements[1]).find('a').length > 0) {
            const url = dom(tdElements[1]).find('a').first().attr('href').split('../../')[1];
            obj.pdfLink = `https://armypubs.army.mil/${url}`;
          } else {
            obj.pdfLink = val;
          }
          break;
        case 'pub/form proponent':
          obj.proponent = val;
          break;
        case 'pub/form status':
          obj.status = val;
          break;
        case 'prescribed forms/prescribing directive':
          obj.directive = val;
          break;
        case 'footnotes':
          obj.footnotes = val;
          break;
        default:
          console.log('unknown label', label);
      }
    });
    return obj;
  }
})({
  URLs: [
    'https://armypubs.army.mil/ProductMaps/PubForm/DAForm1_1000.aspx',
    'https://armypubs.army.mil/ProductMaps/PubForm/DAForm1001_2000.aspx',
    'https://armypubs.army.mil/ProductMaps/PubForm/DAForm2001_3000.aspx',
    'https://armypubs.army.mil/ProductMaps/PubForm/DAForm3001_4000.aspx',
    'https://armypubs.army.mil/ProductMaps/PubForm/DAForm4001_5000.aspx',
    'https://armypubs.army.mil/ProductMaps/PubForm/DAForm5001_6000.aspx',
    'https://armypubs.army.mil/ProductMaps/PubForm/DAForm6001_7000.aspx',
    'https://armypubs.army.mil/ProductMaps/PubForm/DAForm7001_8000.aspx',
    'https://armypubs.army.mil/ProductMaps/PubForm/DAForm8001_9000.aspx'
  ],
  files: [
    'data/documentsList_DA_Forms.json',
    'data/dataSet_DA_Forms.json'
  ]
});

function showProgressBar(iteration, total) {
  const length = 50;  // Length of the progress bar in characters
  const filledLength = Math.round(length * (iteration / total));
  const bar = '#'.repeat(filledLength) + '-'.repeat(length - filledLength);
  const percent = ((iteration / total) * 100).toFixed(1);
  process.stdout.write(`\r[${bar}] ${percent}% Complete.`);
}

async function saveData(file, data) {
  fs.writeFile(file, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error('Error writing JSON file:', err);
    } else {
      console.log('Results saved to', file);
    }
  });
}

async function loadData(file, callback) {
  await fs.readFile(file, 'utf8', async (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      return;
    }
    try {
      await callback(JSON.parse(data))
      return;
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return;
    }
  });
}

async function getLists(url) {
  let results = [];
  try{
    const response = await axios.get(url);
    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);
      $('#MainContent_GridView1').first().find('tr').each((i, tr) => {
        if (i === 0) return;
        const hrefValue = $(tr).find('td').first().find('a').first().attr('href');
        const poi = hrefValue.indexOf('.');//point of injection
        results.push(`${hrefValue.substring(0, poi)}'_Printer'${hrefValue.substring(poi, this.length)}`);
      });
    }
  } catch (error) {
    console.log('An error occurred:', error);
  }
  return results;
}