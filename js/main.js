/* global data */
/* exported data */

var $photoUrl = document.querySelector('#url');
var $title = document.querySelector('#title');
var $notes = document.querySelector('#notes');
var $img = document.querySelector('img');
var $form = document.querySelector('form');

$photoUrl.addEventListener('input', function setImgUrl(event) {
  $img.setAttribute('src', $photoUrl.value);
});

$form.addEventListener('submit', function clickSubmit(event) {
  event.preventDefault();
  var newEntry = {
    title: $title.value,
    photoUrl: $photoUrl.value,
    notes: $notes.value,
    entryId: data.nextEntryId
  };
  data.nextEntryId++;
  data.entries.unshift(newEntry);
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
});
