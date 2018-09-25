/*
 * jQuery plugin - ieImgInterpolation v0.1
 * MS IE have stupid image interpolation, this is a workaround.
 * Ondřej Šplíchal
 */
 
(function($) {
    $.fn.ieImgInterpolation = function(opts) {
    
        var config = $.extend({}, {
            steps: 3,
            ieonly: true
        }, opts);
        
        // main function
        function interpolate(el) {
                
           var img = new Image(); 
           img.src = $(el).attr('src'); 
                 
           img.onload = function() {
              // Step img down several times
        			var can1 = document.createElement('canvas');
        			can1.width = el.width*Math.pow(2, config.steps); 
              can1.height = el.height*Math.pow(2, config.steps);
              can1.getContext('2d').drawImage(img, 0, 0, can1.width, can1.height);
              var can2 = document.createElement('canvas');
              	
        			// Draw it at 1/2 size 3 times (step down three times)
              for(var i=0; i<config.steps; i = i+1){
                half(can1, can2);
                var can3 = can1; can1 = can2; can2 = can3;
              }    
            
            	$(el).attr('orig-src', $(el).attr('src'));
              $(el).attr('src', can1.toDataURL("image/png"));
    	       
           };
        }
        
        function half(canSrc, canOut){
      			canOut.width = canSrc.width/2;
      			canOut.height = canSrc.height/2;
            canOut.getContext('2d').clearRect(0, 0, canOut.width, canOut.height);
      			canOut.getContext('2d').drawImage(canSrc, 0, 0, canSrc.width, canSrc.height, 0, 0, canOut.width, canOut.height);
        }
       
        function detectIE() {
            var ua = window.navigator.userAgent;
          
            // Test values; Uncomment to check result …
            // IE 10
            // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
            // IE 11
            // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
            // Edge 12 (Spartan)
            // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
            // Edge 13
            // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';
          
            var msie = ua.indexOf('MSIE ');
            if (msie > 0) {
              // IE 10 or older => return version number
              return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
            }
          
            var trident = ua.indexOf('Trident/');
            if (trident > 0) {
              // IE 11 => return version number
              var rv = ua.indexOf('rv:');
              return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
            }
          
            var edge = ua.indexOf('Edge/');
            if (edge > 0) {
              // Edge (IE 12+) => return version number
              return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
            }
          
            // other browser
            return false;
          }
        
        // only img elements
        this.filter('img').each(function() {
            if(config.ieonly){
               var ver = detectIE();
               if(ver && ver < 12) interpolate(this);
            }
            
        });
         
        return this;
    };
    
})(jQuery);

