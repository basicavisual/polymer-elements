/***********************
***** MENU ACTIONS *****
***********************/
function doMenuAction(action){
	var u=encodeURIComponent($(location).attr('href'));
	var t=encodeURIComponent($(document).attr('title'));
	var d=encodeURIComponent($(document).attr('description'));
	switch (action){
		case 'refresh': doFilterAction(0, 0); break;
		case 'add': window.open('http://www.cic.mx/?p=50', '_blank'); break;
		case 'help': $('#joyRideTipContent').joyride({autoStart: true});break;
		case 'gplus':  
			console.log('gplus');
			var url = 'https://plusone.google.com/_/+1/confirm?hl=en&url=|u|'; 
			url = url.replace('|u|',u).replace('|t|',t).replace('|d|',d).replace('|140|',t.substring(0,130));
			window.open(url,'t','toolbar=0,resizable=1,status=0,width=640,height=528');
			break;
		case 'twitter':  
			var url = 'https://twitter.com/share?url=|u|&text=|140|'; 
			url = url.replace('|u|',u).replace('|t|',t).replace('|d|',d).replace('|140|',t.substring(0,130));
			window.open(url,'t','toolbar=0,resizable=1,status=0,width=640,height=528');
			break;
		case 'facebook':  
			var url = 'http://www.facebook.com/share.php?u=|u|'; 
			url = url.replace('|u|',u).replace('|t|',t).replace('|d|',d).replace('|140|',t.substring(0,130));
			window.open(url,'t','toolbar=0,resizable=1,status=0,width=640,height=528');
			break;
		default:break;
	}
}

/***********************
*** FILTERING ACTIONS **
***********************/
function doFilterAction(type, element){
	switch (type){
		case 1: 
				//CATEGORIES
				for (var i=0,j=catMarkers.length; i<j; i++){
					categories[catMarkers[i][2]] = document.getElementById(catMarkers[i][2]).checked;
				}	
				//console.log(categories);	
				console.log(element.id);		
				break;
		case 2: 
				//DATES
				console.log(element.id);	
				break;
		case 3: 
				//MUNICIPALITIES
				
				break;
		case 4: 
				//DETAILS
				
				break;
		case 5: 
				//DISTANCE
				
				break;
		case 6: 
				//SHOW & RESET
				if (element === 'show'){
					console.log("clicked :: " + element);
				}else{
					console.log("clicked :: " + element);
				}
				break;
		default: break;
	}
	setQ();
}


/***********************
*** MAIN PANEL VIEWS ***
***********************/
function changeView(view){
   
}


/***********************
*** SET CARTODB QUERY **
***********************/
function setQ(){
   console.log('you called setQ()');
}


/***********************
**** POLYMER-HELPERS ***
***********************/

/* TOGGLING PANEL DRAWER */
document.addEventListener('polymer-ready', function() {
  var navicon = document.getElementById('navicon');
  var drawerPanel = document.getElementById('drawerPanel');
  navicon.addEventListener('click', function() {
    drawerPanel.togglePanel();
  });
});

/* TOGGLING FILTER SUBMENUS (CORE-COLLAPSE) AT PANEL DRAWER MENU */
function toggleCollapse(id){
    var aux = document.querySelector(id).opened;
    document.querySelector('#collapse0').opened = false;
	document.querySelector('#collapse1').opened = false;
	document.querySelector('#collapse2').opened = false;
	document.querySelector('#collapse3').opened = false;
	document.querySelector('#collapse4').opened = false;
    if (!aux) document.querySelector(id).opened = true;
}

/* TOGGLING DIALOGS VIEWS AND SHARE */
function toggleDialog(transition) {
      var dialog = document.querySelector('paper-dialog[transition=' + transition + ']');
      dialog.toggle();
}