import express from "express"
import axios from "axios"
import fs from "fs/promises"
import dotenv from "dotenv"
import { runBizBuySellPlaywright } from "./controller/bizbuy_controller.js";
import { retriveListingUrl, scrapeZillowListings, findDate } from "./controller/zillow_controller.js";
import { retrievePropstreamData } from "./controller/propstream_controller.js";
import { enrichBrokerData } from "./controller/apollo_controllers.js";
dotenv.config();

const app = express();
app.use(express.json());

// Getting the endpoints
const BIZBUYSELL_ENDPOINT = process.env.BIZBUYSELL_ENDPOINT;
const BIZSTART_URL = process.env.BIZSTART_URL;


// route to extract listings from the target websites 

app.get("/extract-listings", async (req, res) => {
  try {
    // Step 1: Add filters to bizbuysell website

    // console.log("Starting BizBuySell extraction...");
    // const bizResponse = await runBizBuySellPlaywright();
    // if (!bizResponse || (bizResponse.statusCode !== 200 && bizResponse.statusCode !== 201)) {
    //   return res.status(500).json({
    //     error: `Failed to fetch data from Apify for LoopNet. Status: ${bizResponse?.status}`,
    //   });
    // }

    // console.log("BizBuySell extraction completed successfully.");
    const istDate = new Date().toLocaleDateString("en-IN", {
      timeZone: "Asia/Kolkata",
    });



    // Step 1: Create request payload for bizbuysell
    // const BIZREQUEST_PAYLOAD = {
    //   maxItems: 100,
    //   startUrls: [
    //     BIZSTART_URL
    //   ],
    // };

    // // Step 2: Request BizBuySell data
    // console.log("Using Apfiy actor to fetch BizBuySell data...");
    // const bizResp = await axios.post(BIZBUYSELL_ENDPOINT, BIZREQUEST_PAYLOAD);
    // if (bizResp.status !== 201) {
    //   return res.status(500).json({ error: `Failed to fetch data from Apify. Status: ${bizResp.status}` });
    // }
    // const rawBizData = bizResp.data;
    // console.log("Data fetched from BizBuySell apify actor successfully.");

    // // Step 3: Extract & transform BizBuySell data from structured array
    // const extractedData = rawBizData.map((item) => {
    //   const [firstName, ...rest] = (item["INTERMEDIARY NAME"] || "").trim().split(" ");
    //   const lastName = rest.length > 0 ? rest.join(" ") : null;

    //   return {
    //     "DATE ADDED": item["DATE ADDED"],
    //     "LISTING EXTRACTED ON": istDate,
    //     SOURCE: "BIZ BUY SELL",
    //     LOCATION: item["LOCATION"] || null,
    //     TITLE: item["TITLE"] || null,
    //     PRICE: item["PRICE"] || null,
    //     EBITDA: item["EBITDA"] || "Not Disclosed",
    //     REVENUE: item["REVENUE"] || null,
    //     "CASH FLOW": item["CASH FLOW"] || null,
    //     "LINK TO DEAL": item["LINK TO DEAL"] || null,
    //     "BROKER FIRM": item["INTERMEDIARY FIRM"] || null,
    //     "BROKER NAME": item["INTERMEDIARY NAME"] || null,
    //     "BROKER FIRST NAME": firstName || null,
    //     "BROKER LAST NAME": lastName,
    //     "BROKER PHONE NUMBER": item["INTERMEDIARY PHONE"] || null,
    //     "BROKER EMAIL": "N/A"
    //   };
    // });




    // // Step 4: Extract zillow starting urls

    // console.log("Fetchiong Zillow listing URLs...");
    // const zillowRespo = await retriveListingUrl();
    // if (!zillowRespo) {
    //   console.error(`Failed to fetch data from Apify for Zillow normal. Status: ${zillowRespo?.status}`);
    //   return;
    // }
    // const listingUrls = zillowRespo;
    // if (!listingUrls) {
    //   console.error("Listing URLs not found in response.");
    //   return;
    // }


    // // Step 5: Retrieve information from each listing
    // console.log("Starting Zillow extraction...");
    // const detailZillowRespo = await scrapeZillowListings(listingUrls);
    // if (!detailZillowRespo) {
    //   console.error(`Failed to fetch detailed data from Apify for Zillow Detail. Status: ${detailZillowRespo?.status}`);
    //   return;
    // }
    // const rawZillowData = detailZillowRespo;

    // console.log("Zillow extraction completed successfully.");

    // // Step 7: Extract & transform Zillow data from structured array
    // rawZillowData.forEach((item) => {
    //   const fullName = item.attributionInfo?.agentName || "";
    //   const [firstName, ...rest] = fullName.trim().split(" ");
    //   const lastName = rest.length > 0 ? rest.join(" ") : null;

    //   extractedData.push({
    //     "DATE ADDED": findDate(item.daysOnZillow),
    //     "LISTING EXTRACTED ON": istDate,
    //     SOURCE: "ZILLOW",
    //     LOCATION: (item.city && item.state) ? `${item.city}, ${item.state}` : "N/A",
    //     TITLE: "N/A",
    //     PRICE: item.price || "N/A",
    //     EBITDA: "Not Disclosed",
    //     REVENUE: "Not Disclosed",
    //     "CASH FLOW": "Not Disclosed",
    //     "LINK TO DEAL": `https://www.zillow.com/${item.hdpUrl?.replace(/^\/?/, '')}`,
    //     "BROKER FIRM": item.attributionInfo?.brokerName || "N/A",
    //     "BROKER NAME": fullName || "N/A",
    //     "BROKER FIRST NAME": firstName || "N/A",
    //     "BROKER LAST NAME": lastName || "N/A",
    //     "BROKER PHONE NUMBER": item.attributionInfo?.agentPhoneNumber || "N/A",
    //     "BROKER EMAIL": "N/A"
    //   });
    // });



    // Step 8: Retrieve information from propstream controller

    console.log("Starting Propstream extraction...");
    const propstreamRespo = await retrievePropstreamData();
    if (!propstreamRespo || propstreamRespo.status !== 200) {
      console.error(`Failed to fetch data from Propstream. Status: ${propstreamRespo?.status}`);
      return res.status(500).json({ error: `Failed to fetch data from Propstream. Status: ${propstreamRespo?.status}` });
    }

    const propstreamData = propstreamRespo.body.scrapedResults;
    propstreamData.forEach((item) => {
      const fullName = item.agentName || "";
      const [firstName, ...rest] = fullName.trim().split(" ");
      const lastName = rest.length > 0 ? rest.join(" ") : null;

      extractedData.push({
        "DATE ADDED": item.statusDate,
        "LISTING EXTRACTED ON": istDate,
        SOURCE: "PROPSTREAM",
        LOCATION: item.title || "N/A",
        TITLE: "N/A",
        PRICE: item.price,
        EBITDA: "Not Disclosed",
        REVENUE: "Not Disclosed",
        "CASH FLOW": "Not Disclosed",
        "LINK TO DEAL": item.link || "N/A",
        "BROKER FIRM": item.brokerFirm || "N/A",
        "BROKER NAME": fullName || "N/A",
        "BROKER FIRST NAME": firstName || "N/A",
        "BROKER LAST NAME": lastName || "N/A",
        "BROKER PHONE NUMBER": item.agentPhone || "N/A",
        "BROKER EMAIL": item.agentEmail || "N/A"
      });
    });


    console.log(extractedData);

    const enriched = await enrichBrokerData(extractedData);






    // Step 5: Save extracted data
    await fs.writeFile("extracted_listings.json", JSON.stringify(enriched, null, 4), "utf-8");

    // Step 6: Return extracted data
    return res.json(extractedData);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
// export default app;
