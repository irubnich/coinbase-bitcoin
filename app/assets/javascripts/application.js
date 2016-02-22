// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require jquery.customSelect.min
//= require_tree .

Array.prototype.random = function() {
	return this[Math.floor(Math.random() * this.length)];
}

Number.prototype.toPrice = function() {
	return this.valueOf().toFixed(2).replace(/./g, function(c, i, a) {
		return i && c !== "." && !((a.length - i) % 3) ? "," + c : c;
	});
}
