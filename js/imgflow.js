/**
 * @author:zyp
 * @version:0.0.2
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
				rWt += w;
				rArr.push(n);
				if (rWt > wt) {
					var lastEl = rArr.pop();
					var sumLen = wt - rWt + $(lastEl).outerWidth(true);
					var d =Math.floor((sumLen) / rArr.length);
					var total=0;
					$.each(rArr, function(j, m) {
						var marginWt=Number($(m).css("margin-left").replace("px",""))||0+Number($(m).css("margin-right").replace("px",""))||0;
						var w2 = $(m).width() + d-marginWt;
						var imgEl = $(m).find("img").eq(0);

						total +=$(m).width() + d;
						if (w2 > imgEl.width()) {
							imgEl.css({
								"width": w2 + "px",
								"height": "auto"
							});
						}
						$(m).width(w2);

						if(j==rArr.length-1&&total!=wt){
							$(m).width(w2+wt-total-2);
							imgEl.width(w2+wt-total-2);
						}
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
			}
			$(_self).html(formatHTML(def.data));
			timer= setTimeout(calcImgElWidth.call(_self), 500);
		});

		$(window).trigger("resize");
	}
}(jQuery))