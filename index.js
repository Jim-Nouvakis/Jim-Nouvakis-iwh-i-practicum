const HUBSPOT_API_KEY ='pat-na1-7d0fa639-0dc4-4b31-ad7e-e94d21369020';
const CUSTOM_OBJECT_ID = '2-41465961';
const express = require('express');
const axios = require('axios');
const app = express();


app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * Please DO NOT INCLUDE the private app access token in your repo. Don't do this practicum in your normal account.
const PRIVATE_APP_ACCESS = '';

// TODO: ROUTE 1 - Create a new app.get route for the homepage to call your custom object data. Pass this data along to the front-end and create a new pug template in the views folder.

app.get("/", async (req, res) => {
    try {
        const response = await axios.get(
            `https://api.hubapi.com/crm/v3/objects/${CUSTOM_OBJECT_ID}?properties=name,species,favorite_food`,
            {
                headers: {
                    Authorization: `Bearer ${HUBSPOT_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const records = response.data.results || []; // Get records from response

        res.render("homepage", { title: "Pet Records", records });
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        res.status(500).send("Error retrieving records");
    }
});

// TODO: ROUTE 2 - Create a new app.get route for the form to create or update new custom object data. Send this data along in the next route.

app.get("/update-cobj", (req, res) => {
    res.render("updates", {
        title: "Update Custom Object Form | Integrating With HubSpot I Practicum",
    });
});


// TODO: ROUTE 3 - Create a new app.post route for the custom objects form to create or update your custom object data. Once executed, redirect the user to the homepage.

app.post("/update-cobj", async (req, res) => {
    const { name, species, favorite_food } = req.body;

    try {
        await axios.post(
            `https://api.hubapi.com/crm/v3/objects/${CUSTOM_OBJECT_NAME}`,
            {
                properties: { name, species, favorite_food },
            },
            {
                headers: {
                    Authorization: `Bearer ${HUBSPOT_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        res.redirect("/");
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        res.status(500).send("Error creating record");
    }
});

// * Localhost
app.listen(3000, () => console.log('Listening on http://localhost:3000'));