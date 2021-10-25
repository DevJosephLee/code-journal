/* global data */
/* exported data */

var $photoUrl = document.querySelector('#url');
var $img = document.querySelector('img');

$photoUrl.addEventListener('input', function (event) {
  $img.setAttribute('src', $photoUrl.value);
});
