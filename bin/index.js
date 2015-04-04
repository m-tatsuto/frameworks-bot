var app = require('../app');
var Twit = require('twit');
var CronJob = require("cron").CronJob;
var moment = require('moment');
var fs = require('fs');
//var http = require('http');

var frameworkTweets = [
  "Phalcon #PHP #Framework\nThe fastest PHP Framework.\n\nhttp://phalconphp.com/ @phalconphp",
  "Laravel #PHP #Framework\nThe PHP Framework For Web Artisans\n\nhttp://laravel.com/ @laravelphp",
  "Play #Java #Scala #Framework\nThe High Velocity Web Framework For Java and Scala\n\nhttps://www.playframework.com/ @playframework",
  "Ruby on Rails #Ruby #Framework\nWeb development that doesn’t hurt\n\nhttp://rubyonrails.org/ @rails",
  "CakePHP #PHP #Framework\n\n\nhttp://cakephp.org/ @cakephp",
  "Underscore.js #Javascript #Framework\n\n\nhttp://underscorejs.org/",
  "BootStrap #HTML #CSS\n HTML,CSS,JS framework for developing responsive, mobile first projects on the web.\n\nhttp://getbootstrap.com/",
  "Sinatra #Ruby #Framework\nDSL for quickly creating web applications \n\nhttp://www.sinatrarb.com/",
  "Backbone.js #Javascript #Framework\n\n\nhttp://backbonejs.org/",
  "jQuery #Javascript #Library\nFast, small, and feature-rich JavaScript library\n\nhttp://jquery.com/",
  "Materialize #CSS #Framework\nA modern responsive front-end framework based on Material Design\n\nhttp://materializecss.com/",
  "MEAN.JS #Javascript #Framework\nOpen-Source Full-Stack Solution For MEAN Applications\n\nhttp://meanjs.org/",
  "MEAN.IO #Javascript #Framework\nMEAN is an opinionated fullstack javascript framework\n\nhttp://mean.io/",
  "Django #Python #Framework\nDjango makes it easier to build better Web apps more quickly and with less code.\n\nhttps://www.djangoproject.com/",
  "Drupal #CMS #Framework\nCome for the software, stay for the community\n\nhttps://www.drupal.org/",
  "CodeIgniter #PHP #Framework\n\n\nhttp://www.codeigniter.com/",
  "CapeDwarf #GoogleAppEngine\nCapeDwarf is an open-source alternative to Google App Engine\n\nhttp://capedwarf.org/",
  "Aurelia #Javascript #Framework\nAurelia is a next generation JavaScript client framework\n\nhttp://aurelia.io/",
  "Socket.io #Javascript #NodeJS\nFEATURING THE FASTEST AND MOST RELIABLE REAL-TIME ENGINE\n\nhttp://socket.io/",
  "OpenShift #PaaS #Redhat\nDEVELOP, HOST, AND SCALE YOUR APPS IN THE CLOUD\n\nhttps://www.openshift.com/",
  "bitbucket #Git #code#hosting\nBitbucket is a free code DVCS hosting site for Git and Mercurial.\n\nhttps://bitbucket.org/",
  "Sauce Labs #Service #Test #Development\nAutomated testing in the cloud for CI.\n\nhttps://saucelabs.com/ @saucelabs",
  "sensu #Monitoring #Framework\nThe open source monitoring framework.\n\nhttp://sensuapp.org/",
  "KILL BILL #Billing #Payment #Platform\nOpen Source Subscription Billing & Payment Platform.\n\nhttp://killbill.io/",
  "testmunk #Service #Test\nTHE FASTEST WAY TO TEST YOUR APP\n\nhttp://testmunk.com/",
  "UNDERSCORES #Wordpress #Theme\nCREATE YOUR UNDERSCORES BASED THEME\n\nhttp://underscores.me/",
  "Yeoman #Tool #npm #Web\nTHE WEB'S SCAFFOLDING TOOL FOR MODERN WEBAPPS\n\nhttp://yeoman.io/",
  "Bower #Tool #npm #Web\nA package manager for the web\n\nhttp://bower.io",
  "Grunt #Tool #Javascript #npm\nThe JavaScript Task Runner\n\nhttp://gruntjs.com",
  "Eclipse #Tool #Development\nAn amazing open source community of Tools, Projects and Collaborative Working Groups.\n\nhttp://eclipse.org",
  "Gitlab #Git #code #management #Tool\nCreate, review and deploy code together\n\nhttps://gitlab.com @gitlab",
  "AMIMOTO #WordPress #AMI #AWS #Nginx\nHigh Performance WordPress Cloud Hosting\n\nhttp://amimoto-ami.com/",
  "flapjack.io #monitoring #Tool #Vagrant\nmonitoring notification routing + event processing system\n\nhttp://flapjack.io/",
  "RECAPTCHA #Security \nProtect your website from spam and abuse while letting real people pass through with ease\n\nhttp://goo.gl/2s0Mci",
  "Chaplin #Javascript #bower\nChaplin is an architecture for JavaScript applications using the Backbone.js.\n\nhttp://chaplinjs.org/",
  "gulpjs #nodejs #workflow #Automate\nAutomate and enhance your workflow\n\nhttp://gulpjs.com/ @gulpjs",
  "RethinkDB #Database\nAn open-source distributed database built with love.\n\nhttp://www.rethinkdb.com/",
  "Capybara #Ruby #Test\nTest your app with Capybara\ngem install capybara\n\nhttp://jnicklas.github.io/capybara/",
  "Slim #PHP\na PHP micro framework that helps you quickly write simple yet powerful web applications and APIs\n\nhttp://goo.gl/2hXfB9",
  "Bourbon #CSS #Sass #Library\nA simple and lightweight mixin library for Sass.\n\nhttp://bourbon.io/",
  "Deployd #API #Design #Build #Opensource\nTHE SIMPLEST WAY TO BUILD AN API.\n\nhttp://deployd.com/ @deploydapp",
  "Ionic #hybrid #mobile #platform #SDK\nThe world's first full-stack hybrid mobile platform\n\nhttp://ionic.io/ @Ionicframework",
  "tsuru #Paas #Opensource\nTsuru is an extensible and open source Platform as a Service software.\n\nhttps://tsuru.io/",
  "Gunicorn #Python #WSGI\nGunicorn 'Green Unicorn' is a Python WSGI HTTP Server for UNIX.\n\nhttp://gunicorn.org/",
  "Sidekiq #Ruby\nSimple, efficient background processing for Ruby.\n\nhttp://sidekiq.org/ @sidekiq"
];

var imageContentTweets = [
  ["bin/image/seldon.png", "seldon #OpenPredictive #Platform\nhttp://www.seldon.io/"],
  ["bin/image/slack.png", "Slack https://slack.com\nWe’re on a mission to make your working life simpler, more pleasant, more productive"],
  ["bin/image/github.png", "GitHub https://github.com #Git #code #hosting\nBuild software better, together."],
  ["bin/image/angularjs.png", "AngularJS https://angularjs.org/ @angularjs #Javascript #Framework\nHTML enhanced for web apps!"],
  ["bin/image/cakephp.png", "CakePHP http://cakephp.org/ @cakephp #PHP #Framework"],
  ["bin/image/heroku.png", "Heroku http://heroku.com/ @heroku #PaaS\nFocus on the app"],
  ["bin/image/grunt.png", "Grunt http://gruntjs.com @gruntjs #Tool #Javascript #npm\nThe JavaScript Task Runner"]
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
    var rnd = Math.floor( Math.random() * 7 );
  	if (rnd < 6) {
  		tweet();
  	} else {
  		imageTweet();
  	}
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

function imageTweet() {

  var rnd = Math.floor( Math.random() * imageContentTweets.length );
  var b64content = fs.readFileSync(imageContentTweets[rnd][0], { encoding: 'base64' })

  T.post('media/upload', { media: b64content }, function (err, data, response) {

    var mediaIdStr = data.media_id_string
    var params = { status: imageContentTweets[rnd][1], media_ids: [mediaIdStr] }

    T.post('statuses/update', params, function (err, data, response) {
    })
  })
}
