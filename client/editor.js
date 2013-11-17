Meteor.startup(function () {
  Session.set("emailNotSaved",false);
});

Meteor.subscribe('files');

Handlebars.registerHelper("wrapperStyle", function(str) {
  return Session.equals('templateChooser', str) ? "true" : "";
});

Handlebars.registerHelper("display_setting", function(selection) {
  return Session.equals("display",selection);
});

Handlebars.registerHelper("django_string", function(str) {
  return str; // get django strings to display as text
});

Handlebars.registerHelper("getValue", function(value) {
  return Session.get(value);
});

Handlebars.registerHelper("sigFirstName", function() {
  return Session.get("signature").split(' ')[0];
});

Handlebars.registerHelper("show_html", function(field) {
  var converter = new Showdown.converter();
  return converter.makeHtml(Session.get(field));
});

Handlebars.registerHelper("removeBackslash", function(field) {
  var str = Session.get(field);
  return str.replace(/\\/g,'');
});

Handlebars.registerHelper("prettifyDate", function(d) {
  if (d) {
    var a_p = "";
    var curr_hour = d.getHours();
    var curr_min = d.getMinutes();
    var pad = function (x) {
      return (x < 10 ? '0' : '') + x;
    };

    if (curr_hour < 12) { a_p = "AM";}
      else { a_p = "PM"; }
    if (curr_hour == 0) { curr_hour = 12; }
    if (curr_hour > 12) { curr_hour = curr_hour - 12; }

    var str = [d.getMonth()+1,d.getDate(),d.getFullYear()-2000].join('/') +
      " " + curr_hour + ":" + pad(curr_min) + " " + a_p;
    return str;
  } else { return ''; }
});

// router

// email functions
function setSessionVarsForEmail(obj) {
  Session.set("id", obj._id);
  Session.set("markdown_data", obj.markdown_data);
  Session.set("templateChooser", obj.type);
  Session.set("topper", obj.topper);
  Session.set("headline", obj.headline);
  Session.set("statement_leadin", obj.statement_leadin);
  Session.set("petition", obj.petition);
  Session.set("link", obj.link);
  Session.set("graphic", obj.graphic);
  Session.set("graphic_alt_text", obj.graphic_alt_text);
  Session.set("signature", obj.signature);
  Session.set("footnotes", obj.footnotes);
  Session.set("facebook", obj.facebook);
  Session.set("twitter", obj.twitter);
  Session.set("creator", obj.creator);
  Session.set("when", obj.when);
}

function setSessionVarsForNewEmail() {
  // template type is set in the link event handler so not necessary here
  // clear the other email session data
  Session.set("markdown_data", "");
  Session.set("topper", "");
  Session.set("headline", "");
  Session.set("statement_leadin", "");
  Session.set("petition", "");
  Session.set("link", "");
  Session.set("graphic", "");
  Session.set("graphic_alt_text", "");
  Session.set("signature", "");
  Session.set("footnotes", "");
  Session.set("facebook", "");
  Session.set("twitter", "");
  Session.set("creator", "");
}

function initSessionVarsForCompose() {
  Session.set("display", "visual");
  Session.set("showNavBar",false);
  Session.set("snippets",false);
  Session.set("toolTips",false);
  Session.set("emailNotSaved",false);
  Session.set("saveDialog",false);
}

// page functions
function setSessionVarsForPage(obj) {
  Session.set("id", obj._id);
  Session.set("type", obj.type);
  Session.set("pageType", obj.pageType);
  Session.set("pageTitle", obj.pageTitle);
  Session.set("pageName", obj.pageName);
  Session.set("pageStatementLeadIn", obj.pageStatementLeadIn);
  Session.set("pageStatementText", obj.pageStatementText);
  Session.set("pageAboutText", obj.pageAboutText);
  Session.set("pageGraphicEmail", obj.pageGraphicEmail);
  Session.set("pageGraphicFacebook", obj.pageGraphicFacebook);
  Session.set("pageGraphicHomePage", obj.pageGraphicHomePage);
  Session.set("pageTAFSL", obj.pageTAFSL);
  Session.set("pageTAFCopy", obj.pageTAFCopy);
  Session.set("pageFacebookTitle", obj.pageFacebookTitle);
  Session.set("pageFacebookCopy", obj.pageFacebookCopy);
  Session.set("pageTwitterCopy", obj.pageTwitterCopy);
  Session.set("pageConfEmailSL", obj.pageConfEmailSL);
  Session.set("pageConfEmailBody", obj.pageConfEmailBody);
  Session.set("creator", obj.creator);
  Session.set("when", obj.when);
  Session.set('AKpageURL', obj.AKpageURL);
  Session.set('AKpageEditURL', obj.AKpageEditURL);
  Session.set('AKpageBitly', obj.AKpageBitly);
  Session.set('pageSharePageLink', obj.pageSharePageLink);
  Session.set('AKpageID',obj.AKpageID);
  Session.set('AKpageResourceURI', obj.AKpageResourceURI);
}

function setSessionVarsForNewPage() {
  // template type is set in the link event handler so not necessary here
  // clear the other email session data
  Session.set("type", "page");
  Session.set("pageTitle", "");
  Session.set("pageName", "");
  Session.set("pageStatementLeadIn", "");
  Session.set("pageStatementText", "");
  Session.set("pageAboutText", "");
  Session.set("pageGraphicEmail", "");
  Session.set("pageGraphicFacebook", "");
  Session.set("pageGraphicHomePage", "");
  Session.set("pageTAFSL", "");
  Session.set("pageTAFCopy", "");
  Session.set("pageFacebookTitle", "");
  Session.set("pageFacebookCopy", "");
  Session.set("pageTwitterCopy", "");
  Session.set("pageConfEmailSL", "");
  Session.set("pageConfEmailBody", "");
  Session.set("creator", "");
  Session.set('AKpageURL', "");
  Session.set('AKpageEditURL', "");
  Session.set('AKpageBitly', "");
  Session.set('pageSharePageLink', "");
  Session.set('AKpageID',"");
  Session.set('AKpageResourceURI', "");
}

function initSessionVarsForPageCompose() {
  Session.set("showNavBar",false);
  Session.set("snippets",false);
  Session.set("toolTips",false);
  Session.set("pageNotSaved",false);
  Session.set("saveDialog",false);
}


Router.map(function () {
  this.route('home', {
    path: '/',
    template: 'filePage',
    action: Session.set('emailNotSaved',false)
  });
  this.route('mailings', {
    path: '/mailings/',
    template: 'filePage',
    action: Session.set('emailNotSaved',false)
  });

  this.route('compose', {
    // compose route with an optional ID parameter
    path: '/mailings/compose/:_id?',
    template: 'composePage',
    before: function () {
      if (this.params._id) {
        Session.set("newEmail", false);
        var email = Files.findOne(this.params._id);
        // check for missing email and throw a 404
        setSessionVarsForEmail(email);
      } else if (this.params.copy) {
        var email = Files.findOne(this.params.copy);
        // check for missing email and throw a 404
        setSessionVarsForEmail(email); // copy email vars from selected email
        Session.set("newEmail", true); // but this is a new email, not a current email
        // clear creator and ID vars because this is a new email
        Session.set("creator", "");
        Session.set("id", "");
      } else {
        Session.set("newEmail", true);
        // default to petition email if no query parameter for template set
        Session.set('templateChooser',this.params.template || 'petition');
        setSessionVarsForNewEmail();
      } 
      initSessionVarsForCompose();
    }
  });
  this.route('pages', {
    path: '/pages/',
    template: 'pages'
  });

  this.route('createPage', {
    path: '/pages/compose/:_id?',
    template: 'createPage',
    before: function () {
      if (this.params._id) {
        Session.set("newPage", false);
        var page = Files.findOne(this.params._id);
        // check for missing email and throw a 404
        setSessionVarsForPage(page);
      } else if (this.params.copy) {
        var page = Files.findOne(this.params.copy);
        // check for missing email and throw a 404
        setSessionVarsForPage(page); // copy email vars from selected email
        Session.set("newPage", true); // but this is a new email, not a current email
        // clear creator and ID vars because this is a new email
        Session.set("creator", "");
        Session.set("id", "");
      } else {
        Session.set("newPage", true);
        // default to petition email if no query parameter for template set
        Session.set('templateChooser', this.params.template || 'petition');
        setSessionVarsForNewPage();
      } 
      initSessionVarsForPageCompose();
    }
  });

  this.route('restore', {
    path: '/restore/',
    template: 'adminDeletedFilesPage'
  });

  this.route('postAPI', {
    path: '/pages/postAPI/:_id?',
    template: 'postAPIpage',
    before: function() {
      var page = Files.findOne(this.params._id);  
      setSessionVarsForPage(page);
    }
  });

});

// this hook will run on almost all routes
Router.before(function () {
  if (! Meteor.user()) {
    this.render('loginPage');
    this.stop();
  }
}, {except: ['login']});


window.onbeforeunload = function closeIt() {
  if (Session.get("emailNotSaved")) {
    return "This email hasn't been saved.";
  } else if (Session.get("pageNotSaved")) {
    return "This page hasn't been saved.";
  } else { return null; }
};

Handlebars.registerHelper("headlineButtonText", function() {
  switch (Session.get("fileSort")) {
    case 'headlineAsc': return "▲";
    case 'headlineDesc': return '▼';
    default: return '—';
  }
});

Handlebars.registerHelper("typeButtonText", function() {
  switch (Session.get("fileSort")) {
    case 'typeAsc': return "▲";
    case 'typeDesc': return '▼';
    default: return '—';
  }
});

Handlebars.registerHelper("createdByButtonText", function() {
  switch (Session.get("fileSort")) {
    case 'createdByAsc': return "▲";
    case 'createdByDesc': return '▼';
    default: return '—';
  }
});

Handlebars.registerHelper("savedByButtonText", function() {
  switch (Session.get("fileSort")) {
    case 'savedByAsc': return "▲";
    case 'savedByDesc': return '▼';
    default: return '—';
  }
});

Handlebars.registerHelper("savedAtButtonText", function() {
  switch (Session.get("fileSort")) {
    case 'savedAtAsc': return "▲";
    case 'savedAtDesc': return '▼';
    default: return '—';
  }
});

Handlebars.registerHelper("currentUserName", function() {
  return Meteor.user().profile.name;
});

Handlebars.registerHelper("belongsToUser", function(name) {
  return Meteor.user().profile.name === name ? true : false;
});

Handlebars.registerHelper("isAdmin", function() {
  var admins = new Array('Jin Ding');
  return admins.indexOf(Meteor.user().profile.name) >= 0 ? true : false;
});
