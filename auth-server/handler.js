<<<<<<< HEAD
'use strict';
const { google } = require("googleapis");
const calendar = google.calendar("v3");
const SCOPES = ["https://www.googleapis.com/auth/calendar.events.public.readonly"];
const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID } = process.env;
const redirect_uris = [
  "https://ambrosia-fish.github.io/meet/"
];
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  redirect_uris[0]
);
module.exports.getAuthURL = async () => {
  /**
   *
   * Scopes array is passed to the `scope` option.
   *
   */
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
=======
exports.hello = async (event) => {
>>>>>>> parent of d6c995a (Initial setup of getAuth serverless function)
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Go Serverless v4! Your function executed successfully!",
    }),
  };
};
<<<<<<< HEAD
module.exports.getAccessToken = async (event) => {
  // Decode authorization code extracted from the URL query
  const code = decodeURIComponent(`${event.pathParameters.code}`);
  return new Promise((resolve, reject) => {
    oAuth2Client.getToken(code, (error, response) => {
      if (error) {
        return reject(error);
      }
      return resolve(response);
    });
  })
    .then((results) => {
      // Respond with OAuth token
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*', // Allow all origins
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(results),
      };
    })
    .catch((error) => {
      // Handle error
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*', // Allow all origins
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(error),
      };
    });
};
module.exports.getCalendarEvents = async (event) => {
  const access_token = decodeURIComponent(`${event.pathParameters.access_token}`);
  oAuth2Client.setCredentials({ access_token });
  return new Promise((resolve, reject) => {
    calendar.events.list(
      {
        calendarId: CALENDAR_ID,
        auth: oAuth2Client,
        timeMin: new Date().toISOString(),
        singleEvents: true,
        orderBy: "startTime",
      },
      (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      }
    );
  })
  .then((results) => {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow all origins
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({ events: results.data.items }),
    };
  })
  .catch((error) => {
    // Handle error
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow all origins
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(error),
    };
  });
};
=======
>>>>>>> parent of d6c995a (Initial setup of getAuth serverless function)
