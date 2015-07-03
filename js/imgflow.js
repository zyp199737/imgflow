/**
 * @author:zyp
 * @version:0.0.1
 */
;
(function($) {
	$.fn.imgflow = function(option) {
		var _self = this;
		var timer;
		var def = {
			imgHeight: "200",
			data: null
		}
		def = $.extend(def, option);

		function formatHTML(data) {
			var str = "<ul>";
			for (var i = 0, len = data && data.length; i < len; i++) {
				str += "<li style='height:" + def.imgHeight + "px;'><a href=''><span>" + data[i].filename + "</span><img src='" + data[i].filepath + "' alt=''/></a></li>";
			}
			str += "</ul>";
			return str;
		}

		function calcImgElWidth() {
			var imgLi = $(this).find("li");
			var wt=$(this).width();
			var rWt = 0,
				rArr = [];
			$.each(imgLi, function(i, n) {
				var w = $(n).outerWidth(true);
				rWt += $(n).outerWidth(true);
				rArr.push(n);
				if (rWt > wt) {
					var lastEl = rArr.pop();
					var sumLen = wt - rWt + $(lastEl).outerWidth(true);
					var d = (sumLen) / rArr.length;
					$.each(rArr, function(j, m) {
						var w2 = $(m).width() + d-5;
						var imgEl = $(m).find("img").eq(0);
						if (w2 > imgEl.width()) {
							imgEl.css({
								"width": w2 + "px",
								"height": "auto"
							});
						}
						$(m).width(Math.floor(w2));
					});
					rWt = $(lastEl).outerWidth(true);
					rArr.length = 0;
					rArr.push(lastEl);
				}
			});
		}

		$(window).bind("resize",function(){
			if(timer){
				window.clearTimeout(timer);
				timer=null;
			}
			$(_self).html(formatHTML(def.data));
			timer= setTimeout(calcImgElWidth.call(_self), 500);
		});

		$(window).trigger("resize");
	}
}(jQuery))