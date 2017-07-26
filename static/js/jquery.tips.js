/**
 * Created by Jgman on 2017/7/14.
 */

(function( $ ) {
    $.fn.myPlugin = function() {

        // 插件的具体内容放在这里
        this.fadeIn('normal', function(){
            // 在这里 this 关键字指向 DOM 元素
        });

    };
})( jQuery );