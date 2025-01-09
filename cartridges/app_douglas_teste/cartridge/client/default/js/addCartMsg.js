'use strict'

$(document).ready(function(){
    $('.add-btn').on('click', function(e) {
        var addToCartMessage = $('.add-btn').attr("data-add-msg");
        alert(addToCartMessage);
    })
});
