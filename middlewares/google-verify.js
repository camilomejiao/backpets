
"use strict";

var { OAuth2Client } = require("google-auth-library");
var client = new OAuth2Client('981374285118-008ek1m6tbvb99cnrc7me8lobk3tds1c.apps.googleusercontent.com');

const verify =  async(token) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: '981374285118-008ek1m6tbvb99cnrc7me8lobk3tds1c.apps.googleusercontent.com', // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const userid = payload["sub"];
    //console.log(payload);
    const {name, email, picture} = payload;

    return { name, email, picture };
    // If request specified a G Suite domain:
    // const domain = payload['hd'];
}

module.exports = {
  verify
};

