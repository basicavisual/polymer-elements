/*
 * jQuery Raptorize Plugin 1.0
 * www.ZURB.com/playground
 * Copyright 2010, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/


(function($) {

    $.fn.raptorize = function(options) {

        //Yo' defaults
        var defaults = {  
            enterOn: 'konami-code', //timer, konami-code, click
            delayTime: 2000 //time before raptor attacks on timer mode
            };  
        
        //Extend those options
        var options = $.extend(defaults, options); 
	
        return this.each(function() {
			var _this = $(this);
			var audioSupported = true;
			var raptorImageMarkup;
			var raptorAudioMarkup;
			image = 'js/plugins/raptor/raptor.png';
			sound = 'js/plugins/raptor/raptor-sound.mp3';
			var locked = false;
			
			// Animating Code
			function init() {
			   
				locked = true;
			    	
					var raptorImageMarkup = '<img id="elRaptor" style="display: none" src="'+image+'" />';
					var raptorAudioMarkup = '<audio id="elRaptorShriek" preload="auto"><source id="elRaptorSnd" src="'+sound+'"/></audio>';	
					
					if(audioSupported) { $('body').append(raptorAudioMarkup); }
					$('body').append(raptorImageMarkup);
					var raptor = $('#elRaptor').css({
						"position":"fixed",
						"bottom": "-700px",
						"right" : "0",
						"display" : "block"
					})
								
				// Movement Hilarity	
				raptor.animate({
					"bottom" : "-700"
				}, function() { 
				
					
					var i = document.getElementById("elRaptor");	i.src = image;
					var s = document.getElementById("elRaptorShriek");s.src = sound;
					if(audioSupported) document.getElementById('elRaptorShriek').play();
					
					
					$(this).animate({
						"bottom" : "0px"
					}, 100, function() {
						var offset = (($(this).position().left)+400);
						$(this).delay(100).animate({
							"right" : offset
						}, 4000, function() {  //Modify this value for speed of screen traversing
							raptor = $('#elRaptor').css({
								"bottom": "-700px",
								"right" : "0"
							})
							locked = false;
							if(audioSupported) { document.getElementById('elRaptorShriek').pause(); document.getElementById('elRaptorShriek').currentTime=0;} 
						})
					});
					
				});
			}
			
			
			//Determine Entrance
			if(options.enterOn == 'timer') {
				setTimeout(init, options.delayTime);
			} else if(options.enterOn == 'click') {
				_this.bind('click', function(e) {
					e.preventDefault();
					if(!locked) {
						init();
					}
				})
			} else if(options.enterOn == 'konami-code'){
			    var kkeys = [], konami = "38,38,40,40,37,39,37,39,66,65";
			    window.addEventListener("keydown", function(e){
			        kkeys.push( e.keyCode );
			        if ( kkeys.toString().indexOf( konami ) >= 0 ) {
			        	init();
			        	kkeys=[];
			        	$(window).unbind('keydown.raptorz');
			        }
			    }, true);
	
			}
			
        });//each call
    }//orbit plugin call
})(jQuery);

