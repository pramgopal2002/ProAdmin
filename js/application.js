/*HTMLElement.prototype.originalRemoveEventListener
        = HTMLElement.prototype.removeEventListener;
 
HTMLElement.prototype.removeEventListener = function(type, listener, useCapture)
{
    console.log('remove: ' + type);
    this.originalRemoveEventListener(type, listener, useCapture);
};
*/

var accounts = [];
var contacts = [];
var employees = [];
var viewAssembler = new ViewAssembler();

$(document).ready( function(){
    loadTemplates( setupDefaultView );
} );

function setupDefaultView() { 
    
    var bodyView = viewAssembler.defaultView(); 
    
    //Setup the default view
    var defaultView = { title: "Welcome!", 
    view:  bodyView,
    };
    
    //Setup the ViewNavigator
    window.viewNavigator = new ViewNavigator( 'body' );	
    window.viewNavigator.pushView( defaultView );
    
	//$.getScript("data.js", scriptSuccess);
}

function onMapButtonClick( event ) {
    var view = { title: "Map",
             backLabel: (isTablet() ? "Back" : " "),
             view: viewAssembler.mapView(),
             scroll:false
           };
    window.viewNavigator.pushView( view );
    event.stopPropagation();
    return false;
}


function onSearchResultMapButtonClick( event ) {
    
    var centerPoint = {x:0,y:0};
    var len = 0;
    
    for( var i = 0; i<window.filteredMarkesList.length; i++ ){
    
        var _x = parseFloat(window.filteredMarkesList[i].x);
        var _y = parseFloat(window.filteredMarkesList[i].y);
    
        if ( !isNaN( _x ) && !isNaN( _y ) ) {
            //console.log( i, len, _x, _y );
            centerPoint.x += _x;
            centerPoint.y += _y;
            len ++;
        }
    }
    //console.log( centerPoint.x, centerPoint.y );
    centerPoint.x = centerPoint.x / len;
    centerPoint.y = centerPoint.y / len;
    
    //console.log( centerPoint.x, centerPoint.y );
    centerPoint = new L.LatLng(centerPoint.y, centerPoint.x);

    var view = { title: "Map",
             backLabel: (isTablet() ? "Back" : " "),
             view: viewAssembler.mapView(centerPoint),
             scroll:false
           };
    window.viewNavigator.pushView( view );
    event.stopPropagation();
    return false;
}


function onAccountsViewClick( event ) {
    var view = { title: "Accounts",
             backLabel: (isTablet() ? "Back" : " "),
             view: viewAssembler.accountsView()
           };
    window.viewNavigator.pushView( view );
    event.stopPropagation();
    return false;
}

function onContactsViewClick( event ) {
    var view = { title: "Contacts",
             backLabel: (isTablet() ? "Back" : " "),
             view: viewAssembler.contactsView(),
           };
    window.viewNavigator.pushView( view );
    event.stopPropagation();
    return false;
}

function onEmployeesViewClick( event ) {

    var view = { title: "Employees",
             view: viewAssembler.employeesView()
           };
    window.viewNavigator.pushView( view );
    event.stopPropagation();
    return false;
}


function scriptSuccess(data, textStatus, jqXHR) {
	
	for ( var i=0; i<markets.length; i++ ) {
	    markets[i].push( i.toString() );
	}
	//console.log( "scriptSuccess: " + markets.length );
}



function openExternalURL( url ) {

    var result=confirm("You will leave the ProAdmin App.  Continue?");
    if (result==true) {
        window.open( url, '_blank' );
    }
}
			
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
   document.addEventListener("backbutton", onBackKey, false);
}

function onBackKey( event ) {
    if ( window.viewNavigator.history.length > 1 ){
        event.preventDefault();
        window.viewNavigator.popView();
        return false;
    }
    navigator.app.exitApp();
}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);