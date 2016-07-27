/*
|-----------------------------------------------------------------|
|   ___   ___         --                              ___   ___   |
|  ||  \ ||__   \  /  ||  /\  ||\ |       ||     /\  ||__) //__`  |
|  ||__/ ||___  \/    || /~~\ || \|       ||___ /~~\ ||__) .___)  |
|-----------------------------------------------------------------|
*/
; (function (plug) { plug(window.jQuery, window, document); }
(function ($, window, document, undefined) {

	'use strict';
	var plugin = 'typian',
		namespacePlugin = 'typian';

	//constructor
	function Plugin(el, opts) {
		
		this._defaults = $.fn[plugin].defaults;
		this.opts = $.extend(true, {}, this._defaults, opts);
		
		this.timer = 0;
		this.counter = 0;
		
		this.el = el;
		this.$el = $(this.el);

		this.init();
	};

	// Methods
	$.extend(Plugin.prototype, {

		//
		init: function () {
			this._setCursor();
			this._setText();
			this._animate();
		},

		//
		_setCursor: function() {
			var that = this;
			if(that.opts.cursor) {
				that.$cursor = $('<span class="'+ namespacePlugin +'-cursor">_</span>');

				that.$el.append(that.$cursor);

				(function blink(){
				   that.$cursor.fadeOut(500).fadeIn(500, blink);
				})();
			}
		},

		//
		_setText: function() {
		  var that = this;
		  
			if(!$.isArray(that.opts.text)) {
				var texts = [];
				texts.push(that.opts.text);
				that.opts.text = texts;
			}
			
			that.strings = that.opts.text.length;
		},

		//
		_animate: function() {
			var that = this;
			
			if(that.strings > 0) {
				
				if(that.counter > 0) {
					that._setBreak();
				}
				
				that.text = that.opts.text[0];
				that.textArray = that.text.split('');
				that.textPart = '';
				that.counter++;
				
				that.$cursor.before('<span class="' + namespacePlugin + '-active"></span>');
			
				that._animatePart();
			}

			that._callback('onTyped', [that]);
		},

		//
		_setBreak: function() {
			var that = this;

			that.$cursor.before('<br />');
		},

		//
		_animatePart: function() {
			var that = this;
			
			var $typian = that.$el.find('.'+ namespacePlugin + '-active');
			
			if(that.textArray.length > 0) {
				that.textPart += that.textArray.shift();
				$typian.html(that.textPart);
			}
			else {
				$typian.removeClass('typian-active');
				clearTimeout(that.timer);
				that.strings--;
				that.opts.text.splice(0, 1);
				that._animate();
			}

			that.timer = setTimeout(function(){
				that._animatePart();
			}, that.opts.delay);
		},
		
		//
		_callback: function (func, args) {
				var funcion = this.opts[func];

				if (typeof funcion === 'function') {
					funcion.apply(this.element, args);
				}
		}
	});

	// Single instance
	// Prevents multiple instances
	$.fn[plugin] = function (options) {
		var returns = undefined, instance = undefined;

		if (options === undefined || typeof options === 'object') {
			return this.each(function () {
				if (!$.data(this, namespacePlugin)) {
					$.data(this, namespacePlugin, new Plugin(this, options));
				}
			});
		}
		else {
			if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
				this.each(function () {
					
					instance = $.data(this, namespacePlugin);
					
					if (instance instanceof Plugin) {
						if (typeof instance[options] === 'function') {
							returns = instance[options].apply(instance, Array.prototype.slice.call(arguments, 1));
						}
						else {
							instance._callback('onError', ['Unknow method'])
						}
					}
					else {
						throw 'error: null object';
					}
				});
				
				return returns !== undefined ? returns : this;
			}
			else {
				throw 'error: illegal';
			}
		}
	};

	// Default config
	$.fn[plugin].defaults = {

		//show cursor
		cursor: true,

		//pipe, underscore, terminal
		cursortype: 'underscore',

		//delay between words
		delay: 200,

		//text type
		text: 'typing...',

		onTyped: function() { }
	};
	
}));
