import express from "express"
import axios from "axios"
import fs from "fs/promises"
import dotenv from "dotenv"
import runLoopnetPlaywright from "./controller/loopnet_playwright.js";
import runBizBuySellPlaywright from "./controller/bizbuy_playwright.js";


function getPrimaryLink(links) {
  if (Array.isArray(links)) {
    for (const link of links) {
      if (link.link) {
        return link.link;
      }
    }
  }
  return null;
}

dotenv.config();

const app = express();
app.use(express.json());

// Getting the endpoints



const LOOPNET_ENDPOINT = process.env.LOOPNET_ENDPOINT
const BIZBUYSELL_ENDPOINT = process.env.BIZBUYSELL_ENDPOINT
app.get("/extract-listings", async (req, res) => {
  try {
    // Step 1: Add filters to the loopnet website 
    const loopResponse = await runLoopnetPlaywright();
    if (!loopResponse || (loopResponse.statusCode !== 200 && loopResponse.statusCode !== 201)) {
      return res.status(500).json({
        error: `Failed to fetch data from Apify for LoopNet. Status: ${loopResponse?.status}`,
      });
    }

    const loopStartingUrl = loopResponse.body.filteredUrl

    // Step 2: Create request payload for loopnet 

    const LOOPNET_REQUEST_PAYLOAD = {
        startUrls: [
            {
            url: loopStartingUrl
            },
        ],
        includeListingDetails: true,
        downloadImages: false,
        maxImages: 10,
        maxItems: 100,
        maxConcurrency: 10,
        minConcurrency: 1,
        maxRequestRetries: 100,
        proxy: {
            useApifyProxy: true,
            apifyProxyGroups: ["RESIDENTIAL"],
        },
    };

    // Step 3: Add filters to bizbuysell website

    const bizResponse = await runBizBuySellPlaywright();
    if (!bizResponse || (bizResponse.statusCode !== 200 && bizResponse.statusCode !== 201)) {
      return res.status(500).json({
        error: `Failed to fetch data from Apify for LoopNet. Status: ${bizResponse?.status}`,
      });
    }

    const bizStartUrl = bizResponse.body.filteredUrl;

    // Step 4: Create request payload for bizbuysell
    const BIZREQUEST_PAYLOAD = {
        maxItems: 100,
        startUrls: [
            bizStartUrl
        ],
    };

    // Step 5: Request for Loopnet data
    const loopnetResp = await axios.post(LOOPNET_ENDPOINT, LOOPNET_REQUEST_PAYLOAD);
    if (loopnetResp.status !== 201) {
      return res.status(500).json({ error: `Failed to fetch data from Apify. Status: ${loopnetResp.status}` });
    }
    const rawData = loopnetResp.data;


    const timestamp = new Date();
    const istTimestamp = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    });

    // Step 6: Extract & transform Loopnet data
    const extractedData = rawData.map((item) => ({
      "DATE ADDED": item.summary?.createdDate ? new Date(item.summary.createdDate).toLocaleString() : null,
      "LISTING EXTRACTED ON": istTimestamp,
      SOURCE: "LOOPNET",
      LOCATION: item.summary?.title?.includes("|") ? item.summary.title.split("|").pop().trim() : null,
      TITLE: item.summary?.title || null,
      PRICE: item.propertyFacts?.Price || null,
      EBITDA: "Not disclosed",
      REVENUE: null,
      "CASH FLOW": null,
      "LINK TO DEAL": getPrimaryLink(item.links),
      "NUMBER OF EMPLOYEES": null,
      "YEAR ESTABLISHED": item.propertyFacts?.YearBuilt || null,
      "BROKER FIRM": item.Broker || null,
      "BROKER NAME": item.agent_fullName || null,
      "BROKER PHONE NUMBER": item.phone || null,
      INVENTORY: null,
      "SELLER TYPE": item.propertyFacts?.SaleType || null,
    }));



    // Step 7: Request BizBuySell data
    const bizResp = await axios.post(BIZBUYSELL_ENDPOINT, BIZREQUEST_PAYLOAD);
    if (bizResp.status !== 201) {
        return res.status(500).json({ error: `Failed to fetch data from Apify. Status: ${bizResp.status}` });
    }
    const rawBizData = bizResp.data;

    // Step 8: Extract & transform BizBuySell data from structured array
    rawBizData.forEach((item) => {
        extractedData.push({
            "DATE ADDED": item["DATE ADDED"],
            "LISTING EXTRACTED ON": istTimestamp,
            SOURCE: "BIZ BUY SELL",
            LOCATION: item["LOCATION"] || null,
            TITLE: item["TITLE"] || null,
            PRICE: item["PRICE"] || null,
            EBITDA: item["EBITDA"] || "Not Disclosed",
            REVENUE: item["REVENUE"] || null,
            "CASH FLOW": item["CASH FLOW"] || null,
            "LINK TO DEAL": item["LINK TO DEAL"] || null,
            "NUMBER OF EMPLOYEES": item["NUMBER OF EMPLOYEES"] || null,
            "YEAR ESTABLISHED": item["YEAR ESTABLISHED"] || null,
            "BROKER FIRM": item["INTERMEDIARY FIRM"] || null,
            "BROKER NAME": item["INTERMEDIARY NAME"] || null,
            "BROKER PHONE NUMBER": item["INTERMEDIARY PHONE"] || null,
            INVENTORY: item["INVENTORY"] || null,
            "SELLER TYPE": item["SELLER TYPE"] || null,
        });
    });

    console.log(extractedData);



    // Step 9: Save extracted data
    await fs.writeFile("extracted_listings.json", JSON.stringify(extractedData, null, 4), "utf-8");

    // Step 10: Return extracted data
    return res.json(extractedData);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
export default app;
