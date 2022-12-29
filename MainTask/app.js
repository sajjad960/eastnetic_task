const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const pretty = require("pretty");

// URL of the page we want to scrape
const url = "https://www.otomoto.pl";

// Async function which scrapes the data
async function scrapeData() {
  try {
    const { data } = await axios.get(url);
    // console.log(data);
    const $ = cheerio.load(data);
    const adsHtmlList = $(".eomulv92");

    adsHtmlList.each(function (idx, el) {
      console.log(idx);

      const adId = $(el).data("testid");

      const adTitle = $(el)
        .children("article")
        .children("section")
        .children("div")
        .children("h2")
        .text();

      const adPrices = $(el)
        .children("article")
        .children("section")
        .children("section")
        .children("div")
        .text();

      const adImage = $(el)
        .children("article")
        .children("img")
        .eq(0)
        .attr("src");

      const adOthersDataHtml = $(el)
        .children("article")
        .children("section")
        .children("div")
        .children("section");

      const listItems = $(el)
        .children("article")
        .children("section")
        .children("div")
        .children("section")
        .children("ul")

        listItems.each((idx, el) => {
          
        })
        

      // console.log(listItems);

      // console.log(listItemsArray);
      // get other list item value
      // listItemsArray.forEach((el, i) => {
      //   console.log(el);
      //   const name = el.children("span").text();
      //   console.log(name);
      // });
      // console.log(adId);
    });
  } catch (err) {
    console.log(err);
  }
}

scrapeData();
