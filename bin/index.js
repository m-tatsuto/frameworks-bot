var app = require('../app');
var Twit = require('twit');
var CronJob = require("cron").CronJob;
var moment = require('moment');
//var http = require('http');

var frameworkTweets = [
 "Phalcon #PHP #Framework\n\nThe fastest PHP Framework.\n\nhttp://phalconphp.com/ \n\n",
 "AngularJS #Javascript #Framework\n\nHTML enhanced for web apps!\n\nhttps://angularjs.org/",
 "Laravel #PHP #Framework\n\nThe PHP Framework For Web Artisans\n\nhttp://laravel.com/",
 "Play #Java #Scala #Framework\n\nThe High Velocity Web Framework For Java and Scala\n\nhttps://www.playframework.com/",
 "Ruby on Rails #Ruby #Framework\n\nWeb development that doesn’t hurt\n\nhttp://rubyonrails.org/",
 "CakePHP #PHP #Framework\n\n\n\nhttp://cakephp.org/",
 "Underscore.js #Javascript #Framework\n\n\n\nhttp://underscorejs.org/",
 "BootStrap #HTML #CSS\n\n HTML,CSS,JS framework for developing responsive, mobile first projects on the web.\n\nhttp://getbootstrap.com/",
 "Sinatra #Ruby #Framework\n\nDSL for quickly creating web applications \n\nhttp://www.sinatrarb.com/",
 "Backbone.js #Javascript #Framework\n\n\n\nhttp://backbonejs.org/",
 "jQuery #Javascript\n\n Fast, small, and feature-rich JavaScript library\n\nhttp://jquery.com/",
 "Materialize #CSS #Framework\n\nA modern responsive front-end framework based on Material Design\n\nhttp://materializecss.com/",
 "MEAN.JS #Javascript #Framework\n\nOpen-Source Full-Stack Solution For MEAN Applications\n\nhttp://meanjs.org/",
 "Django #Python #Framework\n\nDjango makes it easier to build better Web apps more quickly and with less code.\n\nhttps://www.djangoproject.com/",
 "Drupal #CMS #Framework\n\nCome for the software, stay for the community\n\nhttps://www.drupal.org/",
 "CodeIgniter #PHP #Framework\n\n\n\nhttp://www.codeigniter.com/",
 "CapeDwarf #GoogleAppEngine\n\nCapeDwarf is an open-source alternative to Google App Engine\n\nhttp://capedwarf.org/",
 "Aurelia #Javascript #Framework\n\nAurelia is a next generation JavaScript client framework\n\nhttp://aurelia.io/",
 "Socket.io #Javascript #NodeJS\n\nFEATURING THE FASTEST AND MOST RELIABLE REAL-TIME ENGINE\n\nhttp://socket.io/",
 "OpenShift #PaaS #Redhat\n\nDEVELOP, HOST, AND SCALE YOUR APPS IN THE CLOUD\n\nhttps://www.openshift.com/",
 "Heroku #PaaS\n\nFocus on the app\n\nhttp://heroku.com/",
 "bitbucket #Git #code#hosting\n\nBitbucket is a free code DVCS hosting site for Git and Mercurial.\n\nhttps://bitbucket.org/",
 "GitHub #Git #code#hosting\n\nBuild software better, together.\n\nhttps://github.com",
 "Slack #Tool #Development\n\nWe’re on a mission to make your working life simpler, more pleasant and more productive.\n\nhttps://slack.com",
 "Sauce Labs #Service #Test #Development\n\nAutomated testing in the cloud for CI.\n\nhttps://saucelabs.com/",
 "sensu #Monitoring #Framework\n\nThe open source monitoring framework.\n\nhttp://sensuapp.org/",
 "KILL BILL #Billing #Payment #Platform\n\nOpen Source Subscription Billing & Payment Platform.\n\nhttp://killbill.io/",
 "testmunk #Service #Test\n\nTHE FASTEST WAY TO TEST YOUR APP\n\nhttp://testmunk.com/",
 "UNDERSCORES #Wordpress #Theme\n\nCREATE YOUR UNDERSCORES BASED THEME\n\nhttp://underscores.me/",
 "Yeoman #Tool #npm #Web\n\nTHE WEB'S SCAFFOLDING TOOL FOR MODERN WEBAPPS\n\nhttp://yeoman.io/"
];

var T = new Twit({
  consumer_key: app.get('options').key,
  consumer_secret: app.get('options').secret,
  access_token: app.get('options').token,
  access_token_secret: app.get('options').token_secret
});

//var cronTime = '*/10 * * * * *'; // localtest
//var cronTime = '0 */1 * * * *'; // servertest
var cronTime = '0 */30 * * * *'; // production

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
