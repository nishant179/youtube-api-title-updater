const { google } = require("googleapis");
require("dotenv").config();
const CronJob = require("cron").CronJob;

const express = require('express')
const app = express()
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT
);

const updateVideo = async () => {
  oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

  // YouTube client
  const youtube = google.youtube({
    version: "v3",
    auth: oauth2Client,
  });

  try {
    // Get video
    const result = await youtube.videos.list({
      id: "LsU5fxXsypQ", // <-- ID of video 
      part: "statistics,snippet",
    });
    console.log(result);
    if (result.data.items.length > 0) {
      const stats = result.data.items[0].statistics;
      
      // Update the video
      await youtube.videos.update({
        part: "snippet",
        requestBody: {
          id: "LsU5fxXsypQ",
          snippet: {
            title: `This video has ${stats.viewCount} views, ${stats.likeCount} likes, & ${stats.commentCount} comments | IIT Bombay| Class of 2024`,
            categoryId: 28,
          },
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};
const updateEvery8Mins = new CronJob("*/8 * * * * *", async () => {
    updateVideo();
  });
  
  updateEvery8Mins.start();