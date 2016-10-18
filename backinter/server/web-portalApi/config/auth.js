var request = require('request');

exports.validate = function (req, res, next) {


    var tokenObject = "grant_type=urn:pingidentity.com:oauth2:grant_type:validate_bearer&token=eyJhbGciOiJIUzI1NiIsImtpZCI6IjEifQ.eyJjYXRsb2dpbmlkIjoibGl6bGVkZHkiLCJjYXRyZWNpZCI6IlFQVC0zMDAwNTQ2MCIsImNhdGFmbHRuY29kZSI6IjAwNCIsInVjaWQiOiIiLCJleHAiOjE0NzU4Mzg4ODEsInNjb3BlIjpbIm9wZW5pZCIsInByb2ZpbGUiXSwiY2xpZW50X2lkIjoiRm9yZXN0UHJvSGFydmVzdF9jbGllbnQiLCJpc3MiOiJodHRwczovL2ZlZGxvZ2lucWEuY2F0LmNvbSIsImF1ZCI6IkNDRFMifQ.7m_ds_kHB_bagj9XyDguB1QleKQFflwq0Tje9Ijv68s";

    request({
        url: "https://fedloginqa.cat.com/as/token.oauth2",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic Rm9yZXN0UHJvSGFydmVzdEFQSV9jbGllbnQ6MGZBMzVySjB2c25pMm5vMXJ3S0lidWw3OXRVT3NjMTFMeUk4dlR5MkZKUlN2aUJHZWlrS0dEeG1OVndWbWRqdg=='

        },
        method: "POST",
        body: tokenObject
    }, function (err, response, body) {

        if (!err && response.statusCode == 200) {

            next();
        }
        else {
            res.status(401).send("unauthorized");
        }
    });

};