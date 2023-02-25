const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const mailchimp = require("@mailchimp/mailchimp_marketing");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
})

//Setting up MailChimp
mailchimp.setConfig({
    
    apiKey: "",
    
    server: "us21"
});


app.post("/", function (req,res) {
        
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.emailAddress;
        
        const listId = "f1702a0af2";
     
        const subscribingUser = {
         firstName: firstName,
         lastName: lastName,
         email: email
        };

        console.log(subscribingUser);

        //Uploading the data to the server
         async function run() {
         const response = await mailchimp.lists.addListMember(listId, {
         email_address: subscribingUser.email,
         status: "subscribed",
         merge_fields: {
         FNAME: subscribingUser.firstName,
         LNAME: subscribingUser.lastName
        }
        });
        //If all goes well logging the contact's id
         res.sendFile(__dirname + "/success.html")
         console.log(
        `Successfully added contact as an audience member. The contact's id is ${
         response.id
         }.`
        );
        console.log(res.statusCode);
        }
        
        
        // So the catch statement is executed when there is an error so if anything goes wrong the code in the catch code is executed. In the catch block we're sending back the failure page. This means if anything goes wrong send the faliure page
        run().catch(e => res.sendFile(__dirname + "/failure.html"));
        console.log(res.statusCode);
        });

app.post("/failure", function(req, res){
    res.redirect("/");
})



app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running.");
})

// 377ec166af108fca2862739327625140-us21

//f1702a0af2
