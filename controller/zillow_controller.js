import { chromium } from 'playwright';
import dotenv from 'dotenv';
import fs from "fs/promises"
import axios from 'axios'; 

dotenv.config();

// controller function to retrieve listing URLs from Zillow
export async function retriveListingUrl() {
    const ZILLOW_ENDPOINT = process.env.ZILLOW_ENDPOINT;
    const ZILLOW_REQUEST_PAYLOAD = {
        "searchUrls": [
            {
                "url": "https://www.zillow.com/dallas-county-tx/?searchQueryState=%7B%22isMapVisible%22%3Atrue%2C%22mapBounds%22%3A%7B%22north%22%3A33.05807204960438%2C%22south%22%3A32.47607259342136%2C%22east%22%3A-96.41370338085936%2C%22west%22%3A-97.14154761914061%7D%2C%22filterState%22%3A%7B%22sort%22%3A%7B%22value%22%3A%22globalrelevanceex%22%7D%2C%22price%22%3A%7B%22min%22%3A2000000%2C%22max%22%3A2100000%7D%2C%22mp%22%3A%7B%22min%22%3A10374%2C%22max%22%3A10893%7D%7D%2C%22isListVisible%22%3Atrue%2C%22usersSearchTerm%22%3A%22Dallas%20County%2C%20TX%22%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A978%2C%22regionType%22%3A4%7D%5D%7D",
                "method": "GET"
            },
            {
                "url": "https://www.zillow.com/kaufman-county-tx/?searchQueryState=%7B%22isMapVisible%22%3Atrue%2C%22mapBounds%22%3A%7B%22north%22%3A32.89101315223883%2C%22south%22%3A32.30792037308232%2C%22east%22%3A-95.93883988085939%2C%22west%22%3A-96.66668411914064%7D%2C%22filterState%22%3A%7B%22sort%22%3A%7B%22value%22%3A%22globalrelevanceex%22%7D%2C%22price%22%3A%7B%22min%22%3A2000000%2C%22max%22%3A2100000%7D%2C%22mp%22%3A%7B%22min%22%3A10374%2C%22max%22%3A10893%7D%7D%2C%22isListVisible%22%3Atrue%2C%22usersSearchTerm%22%3A%22Kaufman%20County%2C%20TX%22%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A1833%2C%22regionType%22%3A4%7D%5D%7D",
                "method": "GET"
            },
            {
                "url": "https://www.zillow.com/denton-county-tx/?searchQueryState=%7B%22isMapVisible%22%3Atrue%2C%22mapBounds%22%3A%7B%22north%22%3A33.49678897151363%2C%22south%22%3A32.91768448102708%2C%22east%22%3A-96.75232788085937%2C%22west%22%3A-97.48017211914062%7D%2C%22filterState%22%3A%7B%22sort%22%3A%7B%22value%22%3A%22globalrelevanceex%22%7D%2C%22price%22%3A%7B%22min%22%3A2000000%2C%22max%22%3A2100000%7D%2C%22mp%22%3A%7B%22min%22%3A10374%2C%22max%22%3A10893%7D%7D%2C%22isListVisible%22%3Atrue%2C%22usersSearchTerm%22%3A%22Denton%20County%2C%20TX%22%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A988%2C%22regionType%22%3A4%7D%5D%7D",
                "method": "GET"
            },
            {
                "url": "https://www.zillow.com/cooke-county-tx/?searchQueryState=%7B%22isMapVisible%22%3Atrue%2C%22mapBounds%22%3A%7B%22north%22%3A33.974301471076004%2C%22south%22%3A33.398386916231686%2C%22east%22%3A-96.85128038085936%2C%22west%22%3A-97.57912461914061%7D%2C%22filterState%22%3A%7B%22sort%22%3A%7B%22value%22%3A%22globalrelevanceex%22%7D%2C%22price%22%3A%7B%22min%22%3A2000000%2C%22max%22%3A2100000%7D%2C%22mp%22%3A%7B%22min%22%3A10374%2C%22max%22%3A10893%7D%7D%2C%22isListVisible%22%3Atrue%2C%22usersSearchTerm%22%3A%22Cooke%20County%2C%20TX%22%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A455%2C%22regionType%22%3A4%7D%5D%7D",
                "method": "GET"
            },
            {
                "url": "https://www.zillow.com/rockwall-county-tx/?searchQueryState=%7B%22isMapVisible%22%3Atrue%2C%22mapBounds%22%3A%7B%22north%22%3A33.04297653589496%2C%22south%22%3A32.75240283949838%2C%22east%22%3A-96.22608494042969%2C%22west%22%3A-96.59000705957031%7D%2C%22filterState%22%3A%7B%22sort%22%3A%7B%22value%22%3A%22globalrelevanceex%22%7D%2C%22price%22%3A%7B%22min%22%3A2000000%2C%22max%22%3A2100000%7D%2C%22mp%22%3A%7B%22min%22%3A10374%2C%22max%22%3A10893%7D%7D%2C%22isListVisible%22%3Atrue%2C%22usersSearchTerm%22%3A%22Rockwall%20County%2C%20TX%22%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A2516%2C%22regionType%22%3A4%7D%5D%2C%22mapZoom%22%3A11%7D",
                "method": "GET"
            },
            {
                "url": "https://www.zillow.com/grayson-county-tx/?searchQueryState=%7B%22isMapVisible%22%3Atrue%2C%22mapBounds%22%3A%7B%22north%22%3A33.9666609517544%2C%22south%22%3A33.39069503712716%2C%22east%22%3A-96.29836738085939%2C%22west%22%3A-97.02621161914064%7D%2C%22filterState%22%3A%7B%22sort%22%3A%7B%22value%22%3A%22globalrelevanceex%22%7D%2C%22price%22%3A%7B%22min%22%3A2000000%2C%22max%22%3A2100000%7D%2C%22mp%22%3A%7B%22min%22%3A10374%2C%22max%22%3A10893%7D%7D%2C%22isListVisible%22%3Atrue%2C%22usersSearchTerm%22%3A%22Grayson%20County%2C%20TX%22%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A1733%2C%22regionType%22%3A4%7D%5D%7D",
                "method": "GET"
            },
            {
                "url": "https://www.zillow.com/ellis-county-tx/?searchQueryState=%7B%22isMapVisible%22%3Atrue%2C%22mapBounds%22%3A%7B%22north%22%3A32.593141486717165%2C%22south%22%3A32.00811170172312%2C%22east%22%3A-96.37130688085936%2C%22west%22%3A-97.09915111914061%7D%2C%22filterState%22%3A%7B%22sort%22%3A%7B%22value%22%3A%22globalrelevanceex%22%7D%2C%22price%22%3A%7B%22min%22%3A2000000%2C%22max%22%3A2100000%7D%2C%22mp%22%3A%7B%22min%22%3A10374%2C%22max%22%3A10893%7D%7D%2C%22isListVisible%22%3Atrue%2C%22usersSearchTerm%22%3A%22Ellis%20County%2C%20TX%22%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A498%2C%22regionType%22%3A4%7D%5D%7D",
                "method": "GET"
            },
            {
                "url": "https://www.zillow.com/collin-county-tx/?searchQueryState=%7B%22isMapVisible%22%3Atrue%2C%22mapBounds%22%3A%7B%22north%22%3A33.48288171248076%2C%22south%22%3A32.90368492483976%2C%22east%22%3A-96.20559838085939%2C%22west%22%3A-96.93344261914064%7D%2C%22filterState%22%3A%7B%22sort%22%3A%7B%22value%22%3A%22globalrelevanceex%22%7D%2C%22price%22%3A%7B%22min%22%3A2000000%2C%22max%22%3A2100000%7D%2C%22mp%22%3A%7B%22min%22%3A10374%2C%22max%22%3A10893%7D%7D%2C%22isListVisible%22%3Atrue%2C%22usersSearchTerm%22%3A%22Collin%20County%2C%20TX%22%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A951%2C%22regionType%22%3A4%7D%5D%7D",
                "method": "GET"
            },
            {
                "url": "https://www.zillow.com/tarrant-county-tx/?searchQueryState=%7B%22isMapVisible%22%3Atrue%2C%22mapBounds%22%3A%7B%22north%22%3A33.06221723815873%2C%22south%22%3A32.48024497387833%2C%22east%22%3A-96.92756238085937%2C%22west%22%3A-97.65540661914062%7D%2C%22filterState%22%3A%7B%22sort%22%3A%7B%22value%22%3A%22globalrelevanceex%22%7D%2C%22price%22%3A%7B%22min%22%3A2000000%2C%22max%22%3A2100000%7D%2C%22mp%22%3A%7B%22min%22%3A10374%2C%22max%22%3A10893%7D%7D%2C%22isListVisible%22%3Atrue%2C%22usersSearchTerm%22%3A%22Tarrant%20County%2C%20TX%22%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A2049%2C%22regionType%22%3A4%7D%5D%7D",
                "method": "GET"
            },
            {
                "url": "https://www.zillow.com/sherman-county-tx/?searchQueryState=%7B%22isMapVisible%22%3Atrue%2C%22mapBounds%22%3A%7B%22north%22%3A36.55671125283246%2C%22south%22%3A35.998742456402006%2C%22east%22%3A-101.52946238085937%2C%22west%22%3A-102.25730661914062%7D%2C%22filterState%22%3A%7B%22sort%22%3A%7B%22value%22%3A%22globalrelevanceex%22%7D%2C%22price%22%3A%7B%22min%22%3A2000000%2C%22max%22%3A2100000%7D%2C%22mp%22%3A%7B%22min%22%3A10374%2C%22max%22%3A10893%7D%7D%2C%22isListVisible%22%3Atrue%2C%22usersSearchTerm%22%3A%22Sherman%20County%2C%20TX%22%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A2027%2C%22regionType%22%3A4%7D%5D%7D",
                "method": "GET"
            },
            {
                "url": "https://www.zillow.com/van-zandt-county-tx/?searchQueryState=%7B%22isMapVisible%22%3Atrue%2C%22mapBounds%22%3A%7B%22north%22%3A32.88820920158881%2C%22south%22%3A32.30509811456529%2C%22east%22%3A-95.39902188085938%2C%22west%22%3A-96.12686611914063%7D%2C%22filterState%22%3A%7B%22sort%22%3A%7B%22value%22%3A%22globalrelevanceex%22%7D%2C%22price%22%3A%7B%22min%22%3A2000000%2C%22max%22%3A2100000%7D%2C%22mp%22%3A%7B%22min%22%3A10374%2C%22max%22%3A10893%7D%7D%2C%22isListVisible%22%3Atrue%2C%22usersSearchTerm%22%3A%22Van%20Zandt%20County%2C%20TX%22%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A2862%2C%22regionType%22%3A4%7D%5D%7D",
                "method": "GET"
            }
        ]
    };

    try {

        if (!ZILLOW_ENDPOINT) {
            throw new Error("ZILLOW_ENDPOINT is not defined in environment variables.");
        }

        const zillowRespo = await axios.post(ZILLOW_ENDPOINT, ZILLOW_REQUEST_PAYLOAD);

        if (zillowRespo.status !== 201) {
            console.log("coming from zillowcontroller");
            throw new Error(`Failed to fetch data from Apify. Status: ${zillowRespo.status}`);
        }
        const rawZillowData = zillowRespo.data;
        const listingUrls = rawZillowData.map(item => item.detailUrl);
        
        return listingUrls;
    } catch (error) {
        console.error("Error during Zillow data scraping:", error.message);
        return {
            statusCode: 500,
            body: { error: `An error occurred while scraping Zillow data: ${error.message}` }
        };
    }
}


// controller function to find the date the listing was added on zillow
export function findDate(daysOnZillow) {
    if (!daysOnZillow) return "N/A";
    const date = new Date();
    date.setDate(date.getDate() - daysOnZillow);
    return date.toISOString().split('T')[0]; 
}

// controller function to scrape data from Zillow listings
export async function scrapeZillowListings(listingUrls) {   
    if (!listingUrls || listingUrls.length === 0) {
        throw new Error("No listing URLs provided for scraping.");
    }
    const requestBody = {
        propertyStatus: "FOR_SALE",
        startUrls: listingUrls.map(url => ({
            url,
            method: "GET"
        }))
    };

    const ZILLOW_REQUEST_PAYLOAD_DETAIL = JSON.stringify(requestBody, null, 2);
    const ZILLOW_ENDPOINT_DETAIL = process.env.ZILLOW_ENDPOINT_DETAIL;
    console.log("ZILLOW_ENDPOINT_DETAIL:", ZILLOW_ENDPOINT_DETAIL);
    console.log("ZILLOW_REQUEST_PAYLOAD_DETAIL:", ZILLOW_REQUEST_PAYLOAD_DETAIL);

    try {
        if (!ZILLOW_ENDPOINT_DETAIL) {
            throw new Error("ZILLOW_ENDPOINT_DETAIL is not defined in environment variables.");
        }

        const response = await axios.post(ZILLOW_ENDPOINT_DETAIL, requestBody, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status !== 201) {
            throw new Error(`Failed to fetch data from Apify for Zillow listings. Status: ${response.status}`);
        }

        const listingsData = response.data;
        // console.log(listingsData)

        return listingsData;
    } catch (error) {
        console.error("Error during Zillow listings scraping:", error.message);
        throw new Error(`An error occurred while scraping Zillow listings: ${error.message}`);
    }

    
}

// scrapeZillowListings(["https://www.zillow.com/homedetails/N-Tract-Hwy-64-Ben-Wheeler-TX-75754/450025609_zpid/"]).then(data => {
//     console.log("Scraped Zillow Listings Data:", data);
//     }).catch(error => {

//     console.error("Error scraping Zillow Listings:", error.message);
//     });