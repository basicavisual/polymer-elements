/* ACCOUNT-DEPENDING CONFIGURATIONS */
	
	//MARKER IMAGES SOURCE URL
	var sourceurl = "http://i.cic.mx/";
	//DISQUS BOARD NAME FOR COMMENTS
	var disqus_shortname = 'tehuan-beta';
	//CARTO
	var area_name = 'mun_poly';
	var table_name = 'nl_public';
	var table_ageb = 'nl_ageb2010';
	var sql = new cartodb.SQL({ user: 'cicadmin' });
	//ASSETS & IMAGES
	var accountURL = 'nl.cic.mx';
	//VOTES & STARS
	var accountAPI = 'http://api.cic.mx/ushahidi/nl/api/';
	
	/* CONSTANTS */
    
    var publicServices = ['ALCANTARILLAS','ALUMBRADO PUBLICO','BACHE O VIA DAÑADA','FALTA ELECTRICIDAD','FUGA','PARQUES DESCUIDADOS', 'RECOLECCION DE BASURA','SEMAFORO DESCOMPUESTO'];
	var reportOrigins = ['Ushahidi', 'URI', 'CRM', 'Twitter', 'MAIL', 'SMS']; 
	var munNL = ["Abasolo", "Agualeguas", "Allende", "Anáhuac", "Apodaca", "Aramberri", "Bustamante", "Cadereyta Jiménez", "Carmen", "Cerralvo", "China", "Ciénega de Flores", "Dr. Arroyo", "Dr. Coss", "Dr. González", "Galeana", "García", "Gral. Bravo", "Gral. Escobedo", "Gral. Terán", "Gral. Treviño", "Gral. Zaragoza", "Gral. Zuazua", "Guadalupe", "Hidalgo", "Higueras", "Hualahuises", "Iturbide", "Juárez", "Lampazos de Naranjo", "Linares", "Los Aldamas", "Los Herreras", "Los Ramones", "Marín", "Melchor Ocampo", "Mier y Noriega", "Mina", "Montemorelos", "Monterrey", "Parás", "Pesquería", "Rayones", "Sabinas Hidalgo", "Salinas Victoria", "San Nicolás de los Garza", "San Pedro Garza García", "Santa Catarina", "Santiago", "Vallecillo", "Villaldama"];

	//FILTERS ENABLED
	var enableFilter = ['categories','dates'];
	
	//GET TimeZone on client system
	var dateToday = new Date();
	var dateText = dateToday.toString();
	var idxTZ = dateText.indexOf('(');
	var TZ = dateText.substring(idxTZ+1,dateText.length-1);

	/* CARTOCSS STYLE */
	//CATEGORY AND MARKER IMAGE
	/*
	CONFIG ARRAY STRUCTURE: [0]: category name as on cartoDB
					  		[1]: marker or thumbnail image (must be SAME name and type)
					  		[2]: HTML ID name
					  		[3]: category group for marker
	*/
	
	var catMarkers = [
		['AVISOS', 'com_avisos.png', 'avisos', 'COMUNIDAD'],
		['EVENTO PUBLICO', 'com_eventos.png', 'eventos', 'COMUNIDAD'],
		['OBSERVADOR CIUDADANO', 'com_observador.png', 'observador', 'COMUNIDAD'],
		['ALCANTARILLAS', 'ser_alcantarilla.png', 'alcantarillas', 'SERVICIOS PUBLICOS'],
		['ALUMBRADO PUBLICO', 'ser_alumbrado.png', 'alumbrado', 'SERVICIOS PUBLICOS'],
		['FALTA ELECTRICIDAD', 'ser_electricidad.png', 'electricidad', 'SERVICIOS PUBLICOS'],
		['FUGA', 'ser_fuga.png', 'fuga', 'SERVICIOS PUBLICOS'],
		['PARQUES DESCUIDADOS', 'ser_parque.png', 'parques', 'SERVICIOS PUBLICOS'],
		['RECOLECCION DE BASURA', 'ser_basura.png', 'basura', 'SERVICIOS PUBLICOS'],
		['ACCIDENTE', 'via_accidente.png', 'accidente', 'VIALIDAD Y TRANSITO'],
		['BACHE O VIA DAÑADA', 'via_bache.png', 'bache', 'VIALIDAD Y TRANSITO'],
		['OBRAS Y/O VIA CERRADA', 'via_obras.png', 'obras', 'VIALIDAD Y TRANSITO'],
		['SEMAFORO DESCOMPUESTO', 'via_semaforo.png', 'semaforo', 'VIALIDAD Y TRANSITO'],
		['VIALIDAD', 'vialidad.png', 'vialidad', 'VIALIDAD Y TRANSITO'],
		['PROPUESTA COMUNIDAD', 'pro_comunidad.png', 'pcomunidad', 'PROPUESTAS CIUDADANAS'],
		['PROPUESTA SEGURIDAD', 'pro_seguridad.png', 'pseguridad', 'PROPUESTAS CIUDADANAS'],
		['PROPUESTA SERV PUBLICOS', 'pro_servicios.png', 'pservicios', 'PROPUESTAS CIUDADANAS'],
		['PROPUESTA VIALIDAD', 'pro_vialidad.png', 'pvialidad', 'PROPUESTAS CIUDADANAS'],
		['INCENDIO', 'seg_incendio.png', 'incendio', 'SEGURIDAD'],
		['ROBO', 'seg_robo.png', 'robo', 'SEGURIDAD'],
		['SITUACION DE RIESGO', 'seg_sitriesgo.png', 'sitriesgo', 'SEGURIDAD'],
		/*
['DETENCION DE BANDAS', 'seg_detbandas.png', '', 'SEGURIDAD'],
		['EXTORSION', 'seg_extorsion.png', '', 'SEGURIDAD'],
		['HOMICIDIO', 'seg_homicidio.png', '', 'SEGURIDAD'],
		['SECUESTRO', 'seg_secuestro.png', '', 'SEGURIDAD'],
		['SOSPECHOSO', 'seg_sospechoso.png', '', 'SEGURIDAD'],
		['AUTO ABANDONADO', 'seg_autoaban.png', '', 'SEGURIDAD'],
		['PERCEPCION DE INSEGURIDAD', 'seg_percdeinseg.png', '', 'SEGURIDAD'],
*/
		['ROBO AUTO', 'seg_roboauto.png', 'roboauto', 'SEGURIDAD'],
		['EMERGENCIAS', 'emergencia.png', 'emergencias', 'EMERGENCIAS'],
		['OTROS', 'otros.png', 'otros', 'OTROS']
		
	];	
	var catColors = [
		[ "#F48F33", 'VIALIDAD Y TRANSITO', "orange"],
		[ "#FAD714", 'SERVICIOS PUBLICOS', "yellow"],
		[ "#BAD544", 'COMUNIDAD', "lightGreen"],
		[ "#E2E2E2", 'OTROS', "gray"],
		[ "#4CB057", 'PROPUESTAS CIUDADANAS', "green"],
		[ "#669FD2", 'SEGURIDAD', "blue"],
		[ "#DB3539", 'EMERGENCIAS', "red"]
	];
	function createTileStyle(tStyle) {
		var mOverlap;
		var close;
		var tileStyle = "#{{table_name}}{";
		switch (tStyle) {
		case 'normal':
			mOverlap = true;
			closeStyle = "}";
			break;
		case 'cluster':
			mOverlap = false;
			closeStyle = "}";
			break;
		case 'bubble':
			mOverlap = false;
			closeStyle = "}#{{table_name}}{marker-fill:#FF5C00;marker-line-color:#FFF;marker-line-width:2;marker-line-opacity:1;marker-opacity:0.9;marker-placement:point;marker-type:ellipse;marker-allow-overlap:true;marker-clip:false;marker-multi-policy:largest;}"
			break;
		default:
			mOverlap = true;
			closeStyle = "}";
			break;
		}
		for (var i = 0; i < catMarkers.length; i++) {
			tileStyle += "[post_cat='" + catMarkers[i][0] + "']{marker-file:url('" + sourceurl + "map/" + catMarkers[i][1] + "');marker-clip:true;marker-allow-overlap:" + mOverlap + ";marker-width:30 ;}";
		}
		tileStyle += closeStyle;
		if (tStyle == "bubble") {
			for (var j = upperVotes.length - 1; j >= 0; j--) {
				tileStyle += "#{{table_name}}[votes<=" + upperVotes[j] + "]{marker-width:" + widthMarkers[j] + ";marker-line-color:yellow;marker-line-width:10;}";
			}
		}
		return tileStyle;
	}
	//BUBBLE STYLE
	var upperVotes;
	var widthMarkers = [];
	var steps = 10;
	var widthMin=5;
	var widthMax=60;
	for (var i = 0; i < steps; i++) {
		var t = i / (steps - 1);
		widthMarkers.push((widthMin + t * (widthMax - widthMin)).toFixed(1));
	}	var votesBins = 10;
	var votesCssq = "SELECT CDB_JenksBins(array_agg(votes::numeric), "+votesBins+") FROM "+table_name;
	sql.execute(votesCssq).done(function(data) {
		upperVotes = data.rows[0].cdb_jenksbins;
		_tile_style_bubbles = createTileStyle("bubble");
		/* $("#slider-voto").slider({max: upperVotes[upperVotes.length - 1]}); */
	}).error(function(errors) {});
	//OTHER STYLES
	var _tile_style = createTileStyle("normal");
	var _tile_style_cluster = createTileStyle("cluster");
	var _heatmap_style = "#{{table_name}}{marker-fill:#FFCC00;marker-width:12;marker-line-color:#FFF;marker-line-width:3;marker-line-opacity:0.9;marker-opacity:0.9;marker-comp-op:multiply;marker-type:ellipse;marker-placement:point;marker-allow-overlap:true;marker-clip:false;marker-multi-policy:largest;}";
	var _intensity_style = "#{{table_name}}{first/marker-fill:#0011cc;first/marker-opacity:0.01;first/marker-width:80;first/marker-line-width:0;first/marker-placement:point;first/marker-allow-overlap:true;first/marker-comp-op:lighten;second/marker-fill:#00cc11;second/marker-opacity:0.02;second/marker-width:50;second/marker-line-width:0;second/marker-placement:point;second/marker-allow-overlap:true;second/marker-comp-op:lighten;third/marker-fill:#00ff00;third/marker-opacity:0.04;third/marker-width:20;third/marker-line-width:0;third/marker-placement:point;third/marker-allow-overlap:true;third/marker-comp-op:lighten;}";
	
    /* VIEWS */
    var activeView ='home';
    var loadTwitter = true;
    
    var execRepOffset = 0;
	var execRepLimit = 3;
	
	/* DROPDOWN LAYER SELECTOR */	
	var hideCheck;
	var cicCheck=0;
	var checkOptions;
	var gMapsLayers = [
		["carto","CIC"],
		[new google.maps.TrafficLayer(), "Trafico"],
		[new google.maps.TransitLayer(), "Metro"],
		[new google.maps.BicyclingLayer(), "Bicicletas"],
		[new google.maps.weather.WeatherLayer({temperatureUnits: google.maps.weather.TemperatureUnit.CELSIUS}), "Temperatura"],
		[new google.maps.weather.CloudLayer(), "Nubes"],
		[new google.maps.panoramio.PanoramioLayer(),"Fotos"]	
	];	

	/* LOADING SPINNER OPTIONS */
	var opts = {
		lines: 13, // The number of lines to draw
		length: 8, // The length of each line
		width: 22, // The line thickness
		radius: 60, // The radius of the inner circle
		corners: 0.6, // Corner roundness (0..1)
		rotate: 63, // The rotation offset
		direction: 1, // 1: clockwise, -1: counterclockwise
		color: '#4CAA32', // #rgb or #rrggbb
		speed: 1.7, // Rounds per second
		trail: 25, // Afterglow percentage
		shadow: true, // Whether to render a shadow
		hwaccel: true, // Whether to use hardware acceleration
		className: 'spinner', // The CSS class to assign to the spinner
		zIndex: 2e9, // The z-index (defaults to 2000000000)
		top: 'auto', // Top position relative to parent in px
		left: 'auto' // Left position relative to parent in px
	};
				
	/* MAPS RELATED */
	var mapCenter = [25.672938,-100.309296];
	var map, map_T; 
	
	//CARTO
	var layerUrl = 'http://cicadmin.cartodb.com/api/v1/viz/'+table_name+'/viz.json'; 
	var layers = [];
	var torque = null; 
	var torqueOptions;
	var _interactivity = "cartodb_id,post_title,channel,post_cat,formatted_address,post_content,status,close_fail,ticket,last_mod,uuid,follow_up,follow_up_external,votes,stars,assets,created_at";
	var agebLayerUrl = 'http://cicadmin.cartodb.com/api/v1/viz/'+table_ageb+'/viz.json';

	//GMAPS
	var geocoder;
	var overlay,overlay_T;
	var radDeg;
	var shapesArray=[];
	var drawingManager;
    
    //GEO LOCATION
	var myLon, myLat;
    var watchID;
	var gmarker = null;
	var gmarkers=[];

	//CONTROLS AND DISPLAYs	
	var closeByReports = 10;	//for geo loc
	var mapcluster = true;	//for cluster style
	var bubbles = false;
	
	//for ageb use
	var selectedAgeb;
	var choro = false;
	var munLongName=[];
	var rmdHexArr;
	
    /* FILTER VARIABLES AND JQUERY TRIGGERS FOR QUERY DEFINITION */
    
    //CATs are made using catMarker config array
	var categories = {};
	for (var i = 0, j = catMarkers.length; i < j; i++) {
		if (catMarkers[i][2] != '') {
			categories[catMarkers[i][2]] = false;
		}
	}    
	//DATES
    var dates = {
		calendario :  false,
		sietedias : false,
		quincedias : false,
		treintadias : false,
		noventadias : false,
		domingo: false,
		lunes: false, 
		martes: false,
		miercoles: false,
		jueves: false,
		viernes: false,
		sabado: false,
		ulthoras : false,
		horasdeldia : false,
	};
	//MUNs
	var mun = {
		mty : false,
		sp : false,
		sn : false,
		sc : false,
		gpe : false,
		apo : false,
		esc : false,
		jua : false,
		gar : false,
		cad : false,
		stg : false
	};
	//STATUS
    var repStatus = {
		open : false,
		closed : false,
		closed_fail : false
	};
    //DETAIL
    var repDetail = {
	  	voto: false,
	  	star: false,
	  	asset: false  
    };
    var totalvotos = 0;
    var totalstar = 0;
    
    //DISTANCE
    var closedistance = false;
    var radius = {	//radio de interes
		set : false,
		lat : mapCenter[0],
		lng : mapCenter[1],
		rad : 5000
	};
    var polyfilter = false;

	//para vistas consolidadas HC
	var byweeks = false;	//consolidar por semana
	var bymonths = false;	//consolidar por mes
	
	var muncons = false;	//consolidar por categorias
	var normalpob = false;	//normalizar por poblacion
    var normalkm = false;	//normalizar pot km
    
    //text search over post content, formatted address, ticket or wordcloud click
    var searchInput = "";
    
    // globals for query definition
    var _query = "SELECT * FROM "+table_name; //initial query
    var _geoq;
	
	var selectedCat, selectedTitle, selectedContent, selectedTicket, selectedAddress, selectedUrl, selectedStatus, selectedFail, selectedCreate, selectedUpdate, selectedFollowup, selectedFollowupExt, selectedVotes, selectedStars, selectedAssets, selectedComments, selectedUUID;
    
    //variables for time filters
    var desde, hasta;
    var valUltHoras = 3
    var firstTOD = 8, secondTOD = 12;
	var queryhorasdeldia = "(date_part('hour', "+table_name+".created_at at time zone '"+TZ+"') BETWEEN "+firstTOD+" and "+secondTOD+")";
	
	var anyFilter=false;
	
	///ADD SPLICE TO STRING PROTOTYPE FOR INSERTION
	String.prototype.splice = function( idx, rem, str ) {return (this.slice(0,idx) + str + this.slice(idx + Math.abs(rem)));};
	
	// WORDLE
	var wordle;
	
	// OCCURRENCE
	var formattedData = new Array(7);  // 7 days, 24 hours array
	for (var i = 0; i < formattedData.length; i++) {
		formattedData[i] = new Array(24);
	}
	var buckets = 11,
	colorScheme = 'rbow2',
	days = [
	    { name: 'Domingo', abbr: 'Do' },
		{ name: 'Lunes', abbr: 'Lu' },
		{ name: 'Martes', abbr: 'Ma' },
		{ name: 'Miércoles', abbr: 'Mi' },
		{ name: 'Jueves', abbr: 'Ju' },
		{ name: 'Viernes', abbr: 'Vi' },
		{ name: 'Sábado', abbr: 'Sá' }
	  ],
	  hours = ['12a', '1a', '2a', '3a', '4a', '5a', '6a', '7a', '8a', '9a', '10a', '11a', '12p', '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p', '10p', '11p'];
	  
	 // SCORE
	 var effectPercent = {}; 
	 
	 //DISQUS
     var disqus_identifier = '0';
     var disqus_url = window.location.href.split('?')[0];
     var disqus_developer = '1';
     var disqus_config = function () { this.language = "es_MX";};
     (function() {
        var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
        dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
     })();