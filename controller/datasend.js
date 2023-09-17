const axios = require("axios");
const env = require("dotenv");
env.config();

exports.ret = async (req, res) => {
  try {
    // Validate the URL before proceeding
    const { url } = req.body;
    console.log(isValidUrl(url));
    if (!isValidUrl(url)) {
      return res.json({ success: false, error: "Invalid URL" });
    }

    const post_array = [];
    post_array.push({
      url: req.body.url,
      enable_javascript: true,
      load_resources: true,
      enable_browser_rendering: true,
      custom_js: "meta = {}; meta.url = document.URL; meta;",
    });

    axios({
      method: "post",
      url: "https://api.dataforseo.com/v3/on_page/instant_pages",
      auth: {
        username: process.env.USER_NAME,
        password: process.env.PASSWORD,
      },
      data: post_array,
      headers: {
        "content-type": "application/json",
      },
    })
      .then(function (response) {
        const result = response.data.tasks;
        res.json({ success: true, result });
      })
      .catch((error) => {
        console.error(error);
        res
          .status(500)
          .json({ success: false, error: "Something went wrong with the request" });
      });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: "Failed to send request" });
  }
};

function isValidUrl(inputUrl) {
  try {
    // Attempt to create a URL object; if successful, the URL is valid.
    new URL(inputUrl);
    return true;
  } catch (error) {
    return false;
  }
}
