const express = require("express");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const fs = require("fs");
require("dotenv").config();

const router = express.Router();

// Load Google API credentials
const credentials = JSON.parse(fs.readFileSync("google-credentials.json"));

const client = new OAuth2(
  credentials.client_id,
  credentials.client_secret,
  credentials.redirect_uris[0]
);
client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const sheets = google.sheets({ version: "v4", auth: client });

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
const MASTER_SHEET = "MASTER";

router.post("/", async (req, res) => {
  try {
    const { email, username } = req.body;

    if (!email || !username) {
      return res.status(400).json({ message: "Email and username are required" });
    }

    // Step 1: Fetch MASTER sheet data
    const masterData = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${MASTER_SHEET}!A:C`, // Includes Buy & Sell sheet columns
    });

    let userBuySheet = null;
    let userSellSheet = null;
    let existingUser = masterData.data.values?.find((row) => row[0] === email);

    if (existingUser) {
      userBuySheet = existingUser[1];  // Buy sheet already assigned
      userSellSheet = existingUser[2]; // Sell sheet already assigned
    } else {
      // Step 2: Create new Buy & Sell sheets for the user
      userBuySheet = `${username.replace(/\s+/g, "_")}_BUY`;
      userSellSheet = `${username.replace(/\s+/g, "_")}_SELL`;

      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        resource: {
          requests: [
            {
              addSheet: {
                properties: {
                  title: userBuySheet,
                },
              },
            },
            {
              addSheet: {
                properties: {
                  title: userSellSheet,
                },
              },
            },
          ],
        },
      });

      // Step 3: Add user entry to MASTER sheet
      await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: `${MASTER_SHEET}!A:C`,
        valueInputOption: "RAW",
        resource: {
          values: [[email, userBuySheet, userSellSheet]],
        },
      });
    }

    // Step 4: Send response with user details
    res.status(200).json({
      message: "Login successful",
      userBuySheet,
      userSellSheet,
      email,
      username,
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
