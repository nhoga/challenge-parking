const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());

app.get("/parking/:location", async (req, res) => {
  // call to YELP API USING AXIOS
  // params: location
  const { location } = req.params;
  const URL = "https://api.yelp.com/v3/businesses/search";
  const API_KEY =
    "nWIPzXZkCJWv1s5Wix7KGLozEG4JS7O3eajh-6WgyuVc2CtYp4jHMHf6U6q4ZTQrHJQeyHH6r7gCRctSSzFeoYwO85HMkg8kcMzSWsBoKrl4wKGZcq6tt5v_juMEXnYx";

  try {
    const results = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
      params: {
        location,
        categories: "parking",
      },
    });
    res.status(200).send({ data: results.data.businesses });
  } catch (err) {
    res.status(403).send({ err: "Server Error!" });
  }
});

const PORT = 8050;

app.listen(PORT, () => {
  console.log("Server running on PORT: " + PORT);
});
