import createError from "http-errors";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";

import dotenv from 'dotenv';

// get config vars
dotenv.config();

// access config var
console.info(process.env.TOKEN_SECRET);


import fp from "./models/fp.js";
import info from "../package.json" assert { type: "json" };
import db from "./models/db.js";

import indexRouter from "./routes/indexRouter.js";
//  ajaxRouter
import apiRouter from './routes/apiRouter.js'

//  Explicitly create __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.disable("x-powered-by");

// Create the application object in locals for holding a connection pool
app.locals = fp.addObject(app.locals, "dbApp", { version: info.version });
app.locals.dbApp = fp.addObject(app.locals.dbApp,'db',db);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

app.use(
  "/css/bootstrap",
  express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css"))
);
app.use(
  "/js/bootstrap",
  express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js"))
);
app.use(
  "/js/jquery",
  express.static(path.join(__dirname, "../node_modules/jquery/dist"))
);
app.use(
  "/js/dayjs",
  express.static(path.join(__dirname, "../node_modules/dayjs"))
);

app.use("/", indexRouter);
app.use("/ajax", (req, res, next) => res.json("AJAX"));
app.use('/api',apiRouter)



// catch 404 and ;forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
