const express = require("express");
const { google } = require("googleapis");
const favicon = require('serve-favicon');
const path = require('path');


const app = express();
app.use(express.json())
app.use(express.static('public'))
app.set("view engine", "ejs");
app.use(favicon(path.join(__dirname,'public','logo.png')));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", async (req, res) => {
  const data = req.body.data;
  const dlist = data.split(",");
  console.log(dlist);

  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // Create client instance for auth
  const client = await auth.getClient();

  // Instance of Google Sheets API
  const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = "1UASlZ3EBCUCrgFLtLRUz4F34cIqyQ-dNJ0dc49kWkjQ";

  // Get metadata about spreadsheet
  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });

  // Read rows from spreadsheet
  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Sheet1!A:A",
  });

  // Write row(s) to spreadsheet
  await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: "Sheet1!A:Z",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [dlist],
    },
  });

  res.send("Successfully submitted! Thank you!");
});

app.post('/post-test', (req, res)=> {
  console.log("data received")
  const data = req.body.data;
  console.log(data)
  const dlist = data.split(",");
  console.log(dlist);
  res.send(dlist);
})

app.listen(1337, (req, res) => console.log("running on 1337"));