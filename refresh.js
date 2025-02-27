const { google } = require("googleapis");
require("dotenv").config();

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

const getTokens = async () => {
  const res = await oauth2Client.getToken(
    "4/0AQSTgQFUENZ_LI9iwno61mCRcyvxV_CXNyV-csjGGlat-7Kf3kzmbx8RcezqrL4XQklw1Q"
  );
  console.log(res.tokens);
};

getTokens();