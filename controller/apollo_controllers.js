import dotenv from 'dotenv';
dotenv.config();
// function to get the dynamic apollo match URL
function generateApolloMatchUrl(name, organizationName) {
    const encodedName = encodeURIComponent(name);
    const encodedOrg = encodeURIComponent(organizationName);

    return `https://api.apollo.io/api/v1/people/match?name=${encodedName}&organization_name=${encodedOrg}&reveal_personal_emails=true&reveal_phone_number=false`;
}


// function to fetch data from Apollo API
async function fetchApolloData(name, organizationName) {
    const url = generateApolloMatchUrl(name, organizationName);
    const APOLLO_KEY = process.env.APOLLO_API_KEY;

    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/json',
            'x-api-key': APOLLO_KEY
        },
        body: JSON.stringify({
            name: name,
            organization_name: organizationName,
            reveal_personal_emails: true,
            reveal_phone_number: false
        })
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(`Error fetching Apollo data for ${name}:`, err);
        return null;
    }
}

// Function to enrich broker data with Apollo API
export async function enrichBrokerData(extractedData) {
    for (const item of extractedData) {
        const brokerName = item["BROKER NAME"];
        const brokerFirm = item["BROKER FIRM"];
        const existingEmail = item["BROKER EMAIL"];
        const existingPhone = item["BROKER PHONE NUMBER"];

        const needsEnrichment = (existingEmail === "N/A" || existingPhone === "N/A") && brokerName && brokerFirm;

        if (needsEnrichment) {
            const data = await fetchApolloData(brokerName, brokerFirm);
            console.log(`Enriching ${brokerName} (${brokerFirm}) =>`, data);

            // Update email
            if (existingEmail === "N/A") {
                item["BROKER EMAIL"] = data?.person?.email || "N/A";
            }

            // Update phone number
            if (existingPhone === "N/A") {
                let phone = data?.person?.organization?.phone || "N/A";
                if (phone.startsWith("+1")) {
                    phone = phone.slice(2).trim();
                }
                item["BROKER PHONE NUMBER"] = phone;
            }
        }
    }

    return extractedData;
}
