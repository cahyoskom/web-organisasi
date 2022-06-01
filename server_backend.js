const express = require("express");
const bodyParser  = require("body-parser");
const cors = require("cors");

const app = express();

const db = require("./app/models");
db.sequelize.sync({ force: false }).then(() => {
    console.log("Drop and re-sync db.");
  });

var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json(  {
                            limit: '10mb', 
                            extended: true
                          }
                        )
          );

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded(  {
                                  limit: '10mb', 
                                  extended: true
                                }
                              )
        );

//simple route
var url = require("url");
var fs = require("fs");

app.get("/", (req,res)=>{
res.writeHead(200, {'Content-Type' : "text/html"});
fs.readFile("index.html", null, function(error, data){
      if (error) {
        //res.writeHead(404);
        res.write("File index.html not found..");
      }
      else {
        res.write(data);
      }
      res.end();
    });
});

require("./app/routes/organisasi.routes")(app);

//set port, listen for request
const PORT = process.env.PORT || 3001;
app.listen(PORT,() =>{
    console.log(`\n\nBACKEND Server NodeJS is running on port ${PORT}.\n\n`);
});

