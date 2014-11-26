function loadHTML(){
	for (var i=0, j=enableFilter.length; i<j; i++){
		switch (enableFilter[i]){
			case 'categories':
								loadCategories();
								break;
			case 'dates':
								loadDates();
								break;
			case 'municipalities':
								loadLocalities();
								break;
			case 'details':
								loadMetadata();
								break;
			case 'distance':
								loadDistance();
								break;
			default: break;
		}
	}
}


/* METHOD TO CREATE CATEGORIES' SWITCHERS FROM CONFIGURATION ARRAY */
function loadCategories(){
  var element = document.getElementById("categories");
  var _innerHTML = '<center>';
  var _prevgroup;
  for (var i=0,j=catMarkers.length; i<j; i++){
  	var _color; for (var n=0, m=catColors.length; n<m; n++){ if (catMarkers[i][3] === catColors[n][1]){_color = catColors[n][2]; n=m;}}
    var _label;
    if (catMarkers[i][3].indexOf(' ') != -1){
	    _label = catMarkers[i][3].substr(0,catMarkers[i][3].indexOf(' '));
    }
    else{
	     _label = catMarkers[i][3];
    }
    if (i === 0 || _prevgroup != catMarkers[i][3]){
	 _innerHTML +=   "<div center horizontal layout style=\"margin-left:-15px;\"><paper-checkbox class=\""+_color+"\" id=\""+catMarkers[i][3]+"\" onchange=\"doFilterAction(1,this)\" label=\""+_label+"\"></paper-checkbox></div>"
    }
  	_innerHTML += "<div center horizontal layout style=\"margin-left:30px; margin-top: -8px;\"><paper-toggle-button class=\""+_color+"\" id=\""+catMarkers[i][2]+"\" onchange=\"doFilterAction(1,this)\"></paper-toggle-button><img src=\""+sourceurl+"cat/"+catMarkers[i][1]+"\"width=\"45\" height=\"45\" title=\""+catMarkers[i][2]+"\" style=\"margin-top:8px;\"></div>";
  	
  	_prevgroup = catMarkers[i][3];
  }
  _innerHTML += '</center>';
  element.innerHTML = _innerHTML;
}

function loadDates(){
  var element = document.getElementById("dates");
  var _innerHTML = '<center>';
  var eleDates = [
	  ['calendario','Calendario', 'días'],
	  ['sietedias_7','7 días', 'días'],
	  ['quincedias_15','15 días', 'días'],
	  ['treintadias_30','30 días', 'días'],
	  ['noventadias_90','90 días', 'días'],
	  ['domingo_0','Domingos', 'semana'],
	  ['lunes_1','Lunes', 'semana'],
	  ['martes_2','Martes', 'semana'],
	  ['miercoles_3','Miércoles', 'semana'],
	  ['jueves_4','Jueves', 'semana'],
	  ['viernes_5','Viernes', 'semana'],
	  ['sabado_6','Sábados', 'semana'],
	  ['horasdeldía','Horario', 'horas'],
	  ['ulthoras','Últimas horas', 'horas']
  ];  
  var _prevgroup;
  for (var i=0,j=eleDates.length; i<j; i++){
  		switch (eleDates[i][0]){
  			case 'calendario':
  							break;
  			case 'ulthoras':
  							
  							break;
  			case 'horario':
  							break;
  			default:
  					_innerHTML += "<div center horizontal layout style=\"margin-left:3px; margin-top: -2px;\"><paper-toggle-button class=\"default\" id=\""+eleDates[i][0]+"\" onchange=\"doFilterAction(2,this)\"></paper-toggle-button>"+eleDates[i][1]+"</div>";
  							break;
  		}
  		_prevgroup = eleDates[i][2];
  }
  
  _innerHTML += '</center>';
  element.innerHTML = _innerHTML;
}
  
  
  
  