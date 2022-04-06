import express from "express";
const router = express.Router();
const axios = require("axios").default;
const illumina = require("../utils/illumina");
const utils = require("../utils/utils");
const request_opts = illumina.request_opts();
const id2username = require("../utils/id2username");

router.get("/", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  opts.url = "/entitledbundles";
  opts.params = qs;
  axios(opts)
    .then((response: any) => {
      // res.send(response.data);
      res.render("entitledbundles/bundles", {
       data: response.data,
       jsonSyntaxHighlight: utils.jsonSyntaxHighlight,
       });
    })
    .catch((error: Error) => utils.print_error(error));
});

router.get("/:bundleid", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  const bundleid = req.params.bundleid;
  opts.url = `/entitledbundles/${bundleid}`;
  opts.params = qs;
  axios(opts)
    .then((response: any) => {
      //res.send(response.data);
      res.render("entitledbundles/bundleid", {
       data: response.data,
       bundleid: bundleid,
       id2username: id2username.id2username,
       jsonSyntaxHighlight: utils.jsonSyntaxHighlight,
       });
    })
    .catch((error: Error) => utils.print_error(error));
});

module.exports = router;
