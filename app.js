const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const homeStartingContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione natus ex cum eligendi iure officiis nobis, maiores repellat? Obcaecati beatae vitae reiciendis magni, reprehenderit harum consequatur nulla, quam quaerat ducimus, maxime similique natus consequuntur corrupti neque cum quos aut excepturi odit sint! Nostrum, doloremque maiores ipsa amet distinctio suscipit mollitia cumque facilis laudantium fuga perferendis nisi asperiores quae fugiat voluptatibus quis debitis deserunt quo accusantium. Quae culpa pariatur vero ea velit non minus quas placeat in! Nihil minima, voluptates corporis nisi fugit accusamus at iste placeat unde accusantium et architecto repellat hic, cum incidunt neque ad nobis error illo amet.";
const aboutContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione natus ex cum eligendi iure officiis nobis, maiores repellat? Obcaecati beatae vitae reiciendis magni, reprehenderit harum consequatur nulla, quam quaerat ducimus, maxime similique natus consequuntur corrupti neque cum quos aut excepturi odit sint! Nostrum, doloremque maiores ipsa amet distinctio suscipit mollitia cumque facilis laudantium fuga perferendis nisi asperiores quae fugiat voluptatibus quis debitis deserunt quo accusantium. Quae culpa pariatur vero ea velit non minus quas placeat in! Nihil minima, voluptates corporis nisi fugit accusamus at iste placeat unde accusantium et architecto repellat hic, cum incidunt neque ad nobis error illo amet.";
const contactContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione natus ex cum eligendi iure officiis nobis, maiores repellat? Obcaecati beatae vitae reiciendis magni, reprehenderit harum consequatur nulla, quam quaerat ducimus, maxime similique natus consequuntur corrupti neque cum quos aut excepturi odit sint! Nostrum, doloremque maiores ipsa amet distinctio suscipit mollitia cumque facilis laudantium fuga perferendis nisi asperiores quae fugiat voluptatibus quis debitis deserunt quo accusantium. Quae culpa pariatur vero ea velit non minus quas placeat in! Nihil minima, voluptates corporis nisi fugit accusamus at iste placeat unde accusantium et architecto repellat hic, cum incidunt neque ad nobis error illo amet.";

var posts = [];
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/posts/:postName", function (req, res) {
    let requestedTitle = req.params.postName;
    console.log(requestedTitle);
    requestedTitle = _.lowerCase(requestedTitle);
    console.log(requestedTitle);
    posts.forEach(element => {
        let elementTitle = _.lowerCase(element.title);
        if (elementTitle === requestedTitle) {
            res.render("post", {
                title: element.title,
                content: element.content
            });
        }

    });
});

app.get("/", function (req, res) {
    res.render("home", { homeStartingContent: homeStartingContent, posts: posts });
});
app.get("/about", function (req, res) {
    res.render("about", { aboutContent: aboutContent });
});
app.get("/contact", function (req, res) {
    res.render("contact", { contactContent: contactContent });
});
app.get("/compose", function (req, res) {
    res.render("compose");
});


app.post("/compose", function (req, res) {
    let post = {
        title: req.body.postTitle,
        content: req.body.postBody
    };
    posts.push(post);
    res.redirect("/");
});

app.listen(3005, function () {
    console.log("listening on port 3005");
});