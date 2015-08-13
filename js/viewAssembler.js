var templates = {
    accountsViewTemplate:"views/accountsViewTemplate.html",
    defaultViewTemplate:"views/defaultViewTemplate.html",
    contactsViewTemplate:"views/contactsViewTemplate.html",
    employeesViewTemplate:"views/employeesViewTemplate.html",
    loaded: 0,
    requested: 0
};

var ___templatesLoadedCallback;

function loadTemplates(callback) {
    ___templatesLoadedCallback = callback;
    
    //load Mousetache HTML templates
    for (var key in templates) {
        (function() {
             var _key = key.toString();
             if ( _key != "loaded" && _key != "requested" ){
                 templates.requested ++;
                 
                 var templateLoaded = function( template ){
                    onTemplateLoaded( template, _key );
                 }
                 
                 $.get( templates[ _key ], templateLoaded, "html" );
             }
         })();
    }
}

function onTemplateLoaded(template, key) {
    
    //alert( key + ": " + template);
    templates[ key ] = template;
    templates.loaded ++;
    
    if ( templates.loaded == templates.requested ) {
        ___templatesLoadedCallback();
    }
}

function isTablet() {
    var _w = $(window).width();
    var _h = $(window).height();
    return (Math.min(_w,_h) >= 600);
}

function ViewAssembler() {
    this.touchSupported = 'ontouchstart' in window;
    //this.CLICK_EVENT = this.touchSupported ? 'touchend' : 'click';
    this.CLICK_EVENT = 'click';
    return this;
}

ViewAssembler.prototype.defaultView = function() {
    var el = $( templates.defaultViewTemplate );
    el.find("#accounts").on( this.CLICK_EVENT, onAccountsViewClick );
    el.find("#contacts").on( this.CLICK_EVENT, onContactsViewClick );
    el.find("#employees").on( this.CLICK_EVENT, onEmployeesViewClick );
    return el;
}

ViewAssembler.prototype.accountsView = function() {
    var el = $( templates.accountsViewTemplate );
    return el;
}

ViewAssembler.prototype.contactsView = function() {
    var el = $( templates.contactsViewTemplate );
    return el;
}

ViewAssembler.prototype.employeesView = function() {
    var el = $( templates.employeesViewTemplate );
    return el;
}