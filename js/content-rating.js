;(function($){
	$(function(){
        $('body').on("click", ".b-like-dislike-active a.button", function(){
            var self = $(this),
                container = $(this).closest('.b-like-dislike-active');

            if (!container.length) {
                return false;
            }

            var href = self.attr("href"),
                likeCounter = $(".like .count", container),
                dislikeCounter = $(".dislike .count", container);

            if (container.data("processing")) {
                return false;
            }

            container.data("processing", true);

            $.getJSON(href).success(function(response){
                if (response.success) {
                    likeCounter.text(response.data.like);
                    dislikeCounter.text(response.data.dislike);

                    container.removeClass("b-like-dislike-active")
                        .addClass("b-like-dislike-readonly");

                    $("a.button", container).die();
                }

                container.removeData("processing");
            });

            return false;
        });
	});
})(jQuery);