# Welcome To ShonSub Web Repo!

A website for ShonSub - Social Community For Anime

## Example of normal img with text

--------------------------


<!DOCTYPE html>
<html>
<head>
<style>

.cover-img-container {
	position: relative;
  object-fit: contain;
  background-color:black;
  transform: scale(1);
  transition: transform .5s ease;
  overflow:hidden;
  background-color:black;
  overflow: hidden;
}

.image {
  object-fit: contain;
}

.project-img-size {
	width:200px;
  	height:300px;
}

.episode-img-size {
	width:300px;
  	height:200px;
}

.clicked {
	cursor: pointer;
	transform: scale(1);
    transition: transform .5s ease;
}

.clicked:hover{
	transform: scale(1.05);
}

h2 {
	display: inline;
    padding: 0;
    margin: 0;
}

.img-text {
	display: inline;
    position: absolute;
    color: white;
    top: 0px;
    transform: translate(0px, -100px);
    width: 100%;
    max-height: 28%;
  	overflow: hidden;
    background-color: rgba(0,0,0,0.7);
    transition: transform .5s ease;
    text-align: center;
}

.text-on-point {
	transform: translate(0px, 0px);
}

.cover-img-container:hover .img-text {
    transform: translate(0px, 0px);
}

</style>
</head>
<body>


<h2>object-fit: contain:</h2>
<div class="cover-img-container project-img-size pointer clicked">
  <img class="image project-img-size" src="https://www.w3schools.com/tags/img_girl.jpg" alt="Paris">
  <div class="img-text">
    <h2>סאגת ויsa df sda f sda
     sda 
     d
     a sdfda dd asdfda dfasd fdssaלנלד</h2>
  </div>
</div>

<br>

<div class="cover-img-container episode-img-size">
  <img class="image episode-img-size" src="https://css-tricks.com/wp-content/uploads/2018/10/01-container.svg" alt="Paris">
  <div class="img-text text-on-point">
    <h2>סאגת ויsa df sda f sda
     sda 
     d
     a sdfda dd asdfda dfasaf sd faasd f dasd fsdaf sd sadfd fdssaלנלד</h2>
  </div>
</div>

</body>
</html>


--------------------------

### Design Pattern
MVC

![MVC Diagram](https://www.researchgate.net/publication/330140206/figure/fig8/AS:711336036151302@1546607135603/Model-View-ControlMVC-design-pattern.png)

### DBs Scratch
Link to Plectica - 

## First Setup

1. Install **MongoDB Service** from [Here](https://www.mongodb.com/download-center/community)
2. Install **Node.js** from [Here](https://nodejs.org/en/)
3. Clone this repo to your local machine using `git clone https://github.com/elkanagit/ShonSub.git`
4. Go to the path of your local repo and run `npm i`
5. Create a new file in the main directory that called `.env` and put there `DATABASE_URL=mongodb://localhost/test`
6. The party is begin!


## Contributing

1. Pull this repo to your local machine using `git clone https://github.com/elkanagit/ShonSub.git`
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

### Prerequisites

* NPM
* dotenv
* MongoAtlas
* Heroku

## NPM Scripts
* "start": `node server.js`
* "devStart": `nodemon server.js`

### Running the tests

We use **Nodemon** module to run the server

## Built With
### FrontEnd
* HTML
* CSS
* JavaScript
* JQuery

### BackEnd
* Node.js
* Express.js
* Mongoose.js
* MongoDB
* fs module
* EJS

## Main Coder

 **Elkana Hendler** - [GitHub Account](https://github.com/elkanagit)
