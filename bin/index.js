var app     = require('../app');
var Twit    = require('twit');
var CronJob = require("cron").CronJob;
var moment  = require('moment');
var fs      = require('fs');
//var http = require('http');

var frameworkTweets = [
  "Phalcon http://phalconphp.com/ @phalconphp #PHP #Framework\nA full-stack PHP framework delivered as a C-extension",
  "Sinatra #Ruby #Framework\nDSL for quickly creating web applications \n\nhttp://www.sinatrarb.com/",
  "jQuery #Javascript #Library\nFast, small, and feature-rich JavaScript library\n\nhttp://jquery.com/",
  "Materialize #CSS #Framework\nA modern responsive front-end framework based on Material Design\n\nhttp://materializecss.com/",
  "MEAN.JS #Javascript #Framework\nOpen-Source Full-Stack Solution For MEAN Applications\n\nhttp://meanjs.org/",
  "Django #Python #Framework\nDjango makes it easier to build better Web apps more quickly and with less code.\n\nhttps://www.djangoproject.com/",
  "Drupal #CMS #Framework\nCome for the software, stay for the community\n\nhttps://www.drupal.org/",
  "CodeIgniter #PHP #Framework\n\n\nhttp://www.codeigniter.com/",
  "CapeDwarf #GoogleAppEngine\nCapeDwarf is an open-source alternative to Google App Engine\n\nhttp://capedwarf.org/",
  "OpenShift #PaaS #Redhat\nDEVELOP, HOST, AND SCALE YOUR APPS IN THE CLOUD\n\nhttps://www.openshift.com/",
  "Bitbucket #Git #code#hosting\nBitbucket is a free code DVCS hosting site for Git and Mercurial.\n\nhttps://bitbucket.org/",
  "Sauce Labs #Service #Test #Development\nAutomated testing in the cloud for CI.\n\nhttps://saucelabs.com/ @saucelabs",
  "sensu #Monitoring #Framework\nThe open source monitoring framework.\n\nhttp://sensuapp.org/",
  "KILL BILL #Billing #Payment #Platform\nOpen Source Subscription Billing & Payment Platform.\n\nhttp://killbill.io/",
  "testmunk #Service #Test\nTHE FASTEST WAY TO TEST YOUR APP\n\nhttp://testmunk.com/",
  "UNDERSCORES #Wordpress #Theme\nCREATE YOUR UNDERSCORES BASED THEME\n\nhttp://underscores.me/",
  "Eclipse #Tool #Development\nAn amazing open source community of Tools, Projects and Collaborative Working Groups.\n\nhttp://eclipse.org",
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
  "Sidekiq #Ruby\nSimple, efficient background processing for Ruby.\n\nhttp://sidekiq.org/ @sidekiq",
  "cdnjs.com https://cdnjs.com/ #CDN #Search #JavaScript #CSS #SWF #images"
];

var imageContentTweets = [
  ["bin/image/seldon.png",     "seldon #OpenPredictive #Platform\nhttp://www.seldon.io/"],
  ["bin/image/slack.png",      "Slack https://slack.com\nWe’re on a mission to make your working life simpler, more pleasant, more productive"],
  ["bin/image/github.png",     "GitHub https://github.com #Git #code #hosting\nBuild software better, together."],
  ["bin/image/angularjs.png",  "AngularJS https://angularjs.org/ @angularjs #Javascript #Framework\nHTML enhanced for web apps!"],
  ["bin/image/cakephp.png",    "CakePHP http://cakephp.org/ @cakephp #PHP #Framework"],
  ["bin/image/heroku.png",     "Heroku http://heroku.com/ @heroku #PaaS\nFocus on the app"],
  ["bin/image/grunt.png",      "Grunt http://gruntjs.com @gruntjs #Tool #Javascript #npm\nThe JavaScript Task Runner"],
  ["bin/image/backbonejs.png", "Backbone.js http://backbonejs.org/ #Javascript #Framework"],
  ["bin/image/bootstrap.png",  "BootStrap http://getbootstrap.com/ @getbootstrap #HTML #CSS\nDesigned for everyone, everywhere."],
  ["bin/image/rails.png",      "Ruby on Rails http://rubyonrails.org/ @rails #Ruby #Framework\nWeb development that doesn’t hurt"],
  ["bin/image/gitlab.png",     "Gitlab https://gitlab.com @gitlab #Git #code #management\nCreate, review and deploy code together"],
  ["bin/image/Aurelia.png",    "Aurelia http://aurelia.io/ #Javascript #Framework\nAurelia is a next generation JavaScript client framework"],
  ["bin/image/CachetHQ.png",   "CachetHQ https://cachethq.io/ @cachethq #OSS\nBeautiful & simple service statuses."],
  ["bin/image/Lumen.png",      "Lumen. http://lumen.laravel.com/ #PHP #Laravel \nThe stunningly fast micro-framework by Laravel."],
  ["bin/image/Airpal.png",     "Airpal http://airbnb.github.io/airpal/\nA web-based query execution tool built on top of Facebook's PrestoDB"],
  ["bin/image/Laravel.png",    "Laravel http://laravel.com/ @laravelphp #PHP\nThe PHP Framework For Web Artisans"],
  ["bin/image/Yeoman.png",     "Yeoman http://yeoman.io/ #Tool #npm #Web\nTHE WEB'S SCAFFOLDING TOOL FOR MODERN WEBAPPS"],
  ["bin/image/FuelPHP.png",    "FuelPHP http://fuelphp.com/ #PHP #MVC\nFuelPHP is a simple, flexible, community driven"],
  ["bin/image/KeystoneJS.png", "KeystoneJS http://keystonejs.com/ @KeystoneJS #NodeJS #CMS\nNode.js CMS & Web Application Platform"],
  ["bin/image/Kohana.png",     "Kohana http://kohanaframework.org/ #PHP #HMVC\nAn elegant HMVC PHP5 framework"],
  ["bin/image/SocketIO.png",   "Socket.io http://socket.io/ #NodeJS \nFEATURING THE FASTEST AND MOST RELIABLE REAL-TIME ENGINE"],
  ["bin/image/Bower.png",      "Bower http://bower.io @bower #Tool #npm #Web\nA package manager for the web"],
  ["bin/image/Play.png",       "Play https://www.playframework.com/ @playframework #Java #Scala\nThe High Velocity Web Framework"],
  ["bin/image/Revel.png",      "Revel http://revel.github.io/ @revelframework #Go\nA high-productivity web framework for the Go language."],
  ["bin/image/Prometheus.png", "Prometheus http://prometheus.io/ \n An open-source service monitoring system and time series database."],
  ["bin/image/SailsJS.png",    "Sails.js http://sailsjs.org/ @sailsjs #NodeJS #MVC\nThe web framework of your dreams."],
  ["bin/image/POSTMAN.png",    "POSTMAN https://www.getpostman.com/ @postmanclient #Chrome\nBuild,test, and document your APIs faster."],
  ["bin/image/underscore.png", "Underscore.js http://underscorejs.org/ #Javascript #Framework"],
  ["bin/image/T3.png",         "T3 http://t3js.org/\nT3 is a minimalist JavaScript framework that provides core structure to code"],
  ["bin/image/MEANIO.png",     "MEAN.IO http://mean.io/ #Javascript #Framework\nMEAN is an opinionated fullstack javascript framework"],
  ["bin/image/jsbook.jpg",     "Books for Javascript Learning http://goo.gl/uxRL6G #Javascript #Amazon #Book"]
];

var T = new Twit({
  consumer_key: app.get('options').key,
  consumer_secret: app.get('options').secret,
  access_token: app.get('options').token,
  access_token_secret: app.get('options').token_secret
});

var cronTime = '0 */30 * * * *'; // production

new CronJob({
  cronTime: cronTime,
  onTick: function () {
    var rnd = Math.floor( Math.random() * 5 );
    if (rnd < 3) {
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
    console.log('Tweet!');
  });
}

function imageTweet() {

  var rnd = Math.floor( Math.random() * imageContentTweets.length );
  var b64content = fs.readFileSync(imageContentTweets[rnd][0], { encoding: 'base64' })

  T.post('media/upload', { media: b64content }, function (err, data, response) {

    var mediaIdStr = data.media_id_string
    var params = { status: imageContentTweets[rnd][1], media_ids: [mediaIdStr] }

    T.post('statuses/update', params, function (err, data, response) {
      console.log('Tweet!');
    })
  })
}
