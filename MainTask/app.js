const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const pretty = require("pretty");

// URL of the portal we want to scrape
const url = "https://www.otomoto.pl";

// Geting Desire Data Of Every Ad From This Function
function getSingleAdAllData($, el) {
  // helper Variables
  let adId, adTitle, adPrice, adImage;
  let production_date, mileage, fuel_type, power;

  adId = $(el).data("testid");

  adTitle = $(el)
    .children("article")
    .children("section")
    .children("div")
    .children("h2")
    .text();

  adPrice = $(el)
    .children("article")
    .children("section")
    .children("section")
    .children("div")
    .text();

  adImage = $(el).children("article").children("img").eq(0).attr("src");

  allListItems = $(el)
    .children("article")
    .children("section")
    .children("div")
    .children("section")
    .children("ul");

  // geting ad other data
  allListItems.each((idx, el) => {
    const listData = [];

    const singleListItemsList = $(el).contents();
    singleListItemsList.each((idx, el) => {
      const text = $(el).children("span").text();
      listData.push(text);
    });

    [production_date, mileage, fuel_type, power] = listData;
  });
  return {
    adId,
    adImage,
    adTitle,
    adPrice,
    production_date,
    mileage,
    fuel_type,
    power,
  };
}

// Async function which scrapes the data
async function scrapeData() {
  try {
    const { data } = await axios.get(url);
    // console.log(data);
    const $ = cheerio.load(data);
    const adsHtmlList = $(".eomulv92");
    const ads = [];

    adsHtmlList.each(function (idx, el) {
      const {
        adId,
        adImage,
        adTitle,
        adPrice,
        production_date,
        mileage,
        fuel_type,
        power,
      } = getSingleAdAllData($, el);
      // create object with ad data
      const adObject = {};
      adObject.id = adId ?? null;
      adObject.image = adImage ?? null;
      adObject.title = adTitle ?? null;
      adObject.price = adPrice ?? null;
      adObject.production_date = production_date ?? null;
      adObject.mileage = mileage ?? null;
      adObject.fuel_type = fuel_type ?? null;
      adObject.power = power ?? null;

      // store all ads into the ads array
      ads.push(adObject);
    });

    // create json data file with those ads
    const timeStamp = Date.now();
    fs.writeFile(
      `data/ads-${timeStamp}.json`,
      JSON.stringify(ads, null, 2),
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("Successfully written ads data to file");
      }
    );
  } catch (err) {
    console.log("Scraping Fail", err);
  }
}

scrapeData();
