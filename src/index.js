//here database is imported and used.....
import express from "express";
import connectDB from "./db/index.js";
import {app} from "./app.js"


connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`App is listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Database connection failed:", error);
  });



//----------------------alternative-----------------------

/*
let PORT = process.env.PORT;

function appListen(){
      console.log(`App is listening on port ${process.env.PORT}`);
}

connectDB();

app.listen(PORT,appListen())

*/