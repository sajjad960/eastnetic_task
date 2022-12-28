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

      const name = $(el)
        .children("article")
        .children("section")
        .children("div")
        .children("h2")
        .text();
      console.log(name);
    });
    // console.log(adsHtmlList);
  } catch {}
}

scrapeData();
