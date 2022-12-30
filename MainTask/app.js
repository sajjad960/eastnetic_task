const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const pretty = require("pretty");

// URL of the page we want to scrape
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
    });
  } catch (err) {
    console.log(err);
  }
}

scrapeData();
