var submitting = false;

$(function(){
  $.ajaxSetup({
    type: 'POST',
    dataType: 'json',
    timeout: 7500,
    error: function(x, s, t) {
      //alert(error_message);
    },
    complete: function(){submitting = false;}
  });
});


$(window).load(function () {
  // Prittify
  prettyPrint();
});


/**
 * toggleLink
 */
(function($){
  $.fn.toggleLink =function (options) {
    var options = $.extend({
      visible: 'view source',
      invisible: 'hide source'
    }, options);

    return this.each(function(i, e) {
      $(e).click(function (event) {
        event.preventDefault();
        var $this = $(this);
        var obj = $('#' + $this.attr('rel'));

        if (obj.is(':visible')) {
          obj.hide();
          $this.text(options.visible);
        } else {
          obj.show();
          $this.text(options.invisible);
        }
      });
    });
  }
})(jQuery);

/**
 * toggleLinkAll
 */
(function($){
  $.fn.toggleLinkAll =function (options) {
    var options = $.extend({
      visibleAll: 'view all sources',
      invisibleAll: 'hide all sources',
      visible: 'view source',
      invisible: 'hide source',
      children: '#things a.showSource'
    }, options);

    return this.each(function(i, e) {
      $(e).click(function (event) {
        event.preventDefault();
        var $this = $(this);
        var v = $this.data('visible');
        var visible = (typeof v == 'undefined' || v == true);

        $(options.children).each(function () {
          var $t = $(this);
          var id = $t.text((visible) ? options.invisible: options.visible).attr('rel');
          if (visible) {
            $('#' + id).show();
          } else {
            $('#' + id).hide();
          }
        });

        if (visible) {
          $this.text(options.invisibleAll).data('visible', false);
        } else {
          $this.text(options.visibleAll).data('visible', true);
        }
      });
    });
  }
})(jQuery);


/**
 * paginate
 */
(function($){
  $.fn.paginate =function (options) {
    var options = $.extend({
      type: 'GET',
      dataType: 'html',
      timeout: 7000,
      success: null
    }, options);

    return this.each(function(i, e) {
      $(e).click(function() {
        var $this = $(this);
        $this.parent('div')
          .html('<img src="/images/loading.gif" class="valign_middle"/>&nbsp;&nbsp;' +
            '<span class="green">loading...</span>');
        options.url = $this.attr('href');
        $.ajax(options);
        return false;
      });
    });
  }
})(jQuery);


/**
 * Destroyer
 */
(function($){
  $.fn.destroyer =function (options) {
    var options = $.extend({
      progressMessage: 'deleting...',
      completeMessage: 'deleted!',
      errorMessage: 'Sorry, an error occured.'
    }, options);

    var destroy = function() {
      var $this = $(this);
      var token = $this.attr('rel').split('_');
      var type = token[0];
      var key = token[1];
      var msg = 'Sure you want to delete this ' + type + '? There is NO undo!';

      if (!window.confirm(msg))
        return false;

      var parent = $(this.parentNode);
      var container = $('#' + type + '_' + key);

      $.ajax({
        type: 'POST',
        url: '/' + type + '/' + key + '/delete/',
        beforeSend: function(){ parent.html(options.progressMessage + '...'); },
        dataType: 'json',
        data: {_method: 'delete'},
        timeodut: 6000,
        success: function(obj){
          if(obj.error){alert(options.errorMessage);}
          else if(obj.success){
            if (container.length > 0) {
              container.hide();
            } else if (obj.redirect) {
              window.location = obj.redirect;
            } else {window.location = '/';}
          } else {
            alert(options.errorMessage);
          }
        },
        error: function () {
         alert(options.errorMessage);
        }
      });
      return false;
    }

    return this.each(function(i, e) {
      $(e).click(destroy);
    });
  }
})(jQuery);
