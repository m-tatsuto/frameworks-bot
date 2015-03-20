var app = require('../app');
var Twit = require('twit');
var CronJob = require("cron").CronJob;
var moment = require('moment');
//var http = require('http');

var frameworkTweets = [
 "Phalcon \n\nThe fastest PHP Framework. #PHP #Framework\n\nhttp://phalconphp.com/ \n\n",
 "AngularJS \n\nHTML enhanced for web apps! #Javascript #Framework\n\nhttps://angularjs.org/",
 "Laravel \n\nThe PHP Framework For Web Artisans #PHP #Framework\n\nhttp://laravel.com/",
 "Play \n\nThe High Velocity Web Framework For Java and Scala #Java #Scala #Framework \n\nhttps://www.playframework.com/",
 "Ruby on Rails \n\nWeb development that doesn’t hurt #Ruby #Framework\n\nhttp://rubyonrails.org/",
 "CakePHP \n\n #PHP #Framework\n\nhttp://cakephp.org/",
 "Underscore.js \n\n #Javascript #Framework\n\nhttp://underscorejs.org/",
 "BootStrap \n\n HTML,CSS,JS framework for developing responsive, mobile first projects on the web.#HTML #CSS\n\nhttp://getbootstrap.com/",
 "Sinatra \n\nDSL for quickly creating web applications #Ruby #Framework \n\nhttp://www.sinatrarb.com/",
 "Backbone.js \n\n #Javascript #Framework\n\nhttp://backbonejs.org/",
 "jQuery \n\n Fast, small, and feature-rich JavaScript library #Javascript\n\nhttp://jquery.com/",
 "Materialize \n\nA modern responsive front-end framework based on Material Design #CSS #Framework\n\nhttp://materializecss.com/",
 "MEAN.JS \n\nOpen-Source Full-Stack Solution For MEAN Applications #Javascript #Framework\n\nhttp://meanjs.org/",
 "Django \n\nDjango makes it easier to build better Web apps more quickly and with less code. #Python #Framework\n\nhttps://www.djangoproject.com/",
 "Drupal \n\nCome for the software, stay for the community #CMS #Framework\n\nhttps://www.drupal.org/",
 "CodeIgniter \n\n #PHP #Framework\n\nhttp://www.codeigniter.com/",
 "CapeDwarf \n\nCapeDwarf is an open-source alternative to Google App Engine #GoogleAppEngine\n\nhttp://capedwarf.org/",
 "Aurelia \n\nAurelia is a next generation JavaScript client framework #Javascript #Framework\n\nhttp://aurelia.io/",
 "Socket.io \n\nFEATURING THE FASTEST AND MOST RELIABLE REAL-TIME ENGINE #Javascript #NodeJS\n\nhttp://socket.io/",
 "OpenShift \n\nDEVELOP, HOST, AND SCALE YOUR APPS IN THE CLOUD #PaaS #Redhat\n\nhttps://www.openshift.com/",
 "Heroku \n\nFocus on the app #PaaS\n\nhttp://heroku.com/"
];

var T = new Twit({
  consumer_key: app.get('options').key,
  consumer_secret: app.get('options').secret,
  access_token: app.get('options').token,
  access_token_secret: app.get('options').token_secret
});

//var cronTime = '*/10 * * * * *'; // localtest
var cronTime = '0 */1 * * * *'; // servertest
//var cronTime = '0 */30 * * * *'; // production

new CronJob({
  cronTime: cronTime,
  onTick: function () {
    tweet();
  },
  start: true
});

function tweet(){
  var rnd = Math.floor( Math.random() * frameworkTweets.length );
  var message = frameworkTweets[rnd];
  console.log(message);

  T.post('statuses/update', { status: message }, function(err, data, response) {
    //console.log('Tweet!');
  });
}
