const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());


app.post("/create", (req, res) => {
    const { fileName, fileData } = req.body;
    const filePath = "./uploads/" + fileName;

    fs.writeFile(filePath, fileData, (error) => {
        if (error) {
            res.send("File not created.");
        } else {
            res.send("File created successfully.");
        }
    });
});

app.get("/read/:fileName", (req, res) => {
    const { fileName } = req.params;
    const filePath = "./uploads/" + fileName;
    fs.readFile(filePath, (error, data) => {
        if (error) {
            res.send("File reading failed.");
        }
        return res.send(data);
    });
});

app.put("/update/:fileName", (req, res) => {
    const { fileName } = req.params;
    const filePath = "./uploads/" + fileName;
    const {newFileData} = req.body;
    fs.appendFile(filePath, newFileData, (error) => {
        if (error) {
            res.send("File not updated!");
        } else {
            res.send("File updated successfully.");
        }
    });
});




app.listen(3000, () => {
    console.log("Server is running on port : 3000");
});