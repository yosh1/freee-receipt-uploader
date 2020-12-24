const fs = require("fs");
const path = require("path");
const FormData = require("form-data");
const axios = require("axios");
require("dotenv").config();
const auth_token = process.env.AUTH_TOKEN;
const company_id = process.env.COMPANY_ID;

const dirPath = path.resolve(__dirname, "img");
const list = fs.readdirSync(dirPath);
console.log(list)

const URL = `https://api.freee.co.jp/api/1/receipts`;

for (let i = 0; i < list.length; i++){
    const imagePath = './img/' + list[i]
    const file = fs.createReadStream(imagePath);

    const form = new FormData();
    form.append("receipt", file);
    form.append("company_id", company_id);

    const config = {
        headers: {
            accept: "application/json",
            "X-Api-Version": "2020-06-15",
            Authorization: "Bearer " + auth_token,
            "Content-Type": "multipart/form-data",
            ...form.getHeaders(),
        },
    };

    axios
        .post(URL, form, config)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
}

