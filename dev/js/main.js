// Particles

particlesJS.load('particles-js', 'particles.json', function() {
   console.log('particles.js loaded - callback');});



//Moving box

var moveForce = 10; // max popup movement in pixels
var rotateForce = 10; // max popup rotation in deg

$('#tabs_container').mousemove(function(e) {
    var docX = $(document).width();
    var docY = $(document).height();

    var moveX = (e.pageX - docX/2) / (docX/2) * -moveForce;
    var moveY = (e.pageY - docY/2) / (docY/2) * -moveForce;

    var rotateY = (e.pageX / docX * rotateForce*2) - rotateForce;
    var rotateX = -((e.pageY / docY * rotateForce*2) - rotateForce);

    $('.popup')
        .css('left', 0+'px')
        .css('top', 0+'px')
        .css('transform', 'rotateX('+0+'deg) rotateY('+0+'deg)');
});
$('#particles-js').mousemove(function(e) {
    var docX = $(document).width();
    var docY = $(document).height();

    var moveX = (e.pageX - docX/2) / (docX/2) * -moveForce;
    var moveY = (e.pageY - docY/2) / (docY/2) * -moveForce;

    var rotateY = (e.pageX / docX * rotateForce*2) - rotateForce;
    var rotateX = -((e.pageY / docY * rotateForce*2) - rotateForce);

    $('.popup')
        .css('left', moveX+'px')
        .css('top', moveY+'px')
        .css('transform', 'rotateX('+rotateX+'deg) rotateY('+rotateY+'deg)');
});


// Tabs Content
$(document).ready(function () {
    $('#tabs').tabs({
        show: {
            effect: "blind",
            duration: 500
        },
        hide: {
            effect: "blind",
            duration: 500
        }
    });
});

// GALLERY
$('.imageGallery1 a').simpleLightbox();

//Active ABout me on page landing
document.getElementById('active').focus();
