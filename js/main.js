/* global data */
/* exported data */
var $photoUrl = document.querySelector('#url');
var $title = document.querySelector('#title');
var $notes = document.querySelector('#notes');
var $img = document.querySelector('img');
var $form = document.querySelector('form');
var $entryList = document.querySelector('.entry-list');
var $viewNodeList = document.querySelectorAll('.view');
var $noEntriesMessage = document.querySelector('p');
var $entryFormPage = document.querySelector('div[data-view="entry-form"');
var $entriesPage = document.querySelector('div[data-view="entries"');

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
  $entryList.prepend(renderEntry(newEntry));

  $entryFormPage.className = 'view hidden';
  $entriesPage.className = 'view';

  if (data.entries.length > 0) {
    $noEntriesMessage.className = 'hidden';
  }
});

function renderEntry(entry) {
  var $root = document.createElement('li');
  $root.setAttribute('class', 'margin-bottom-1');

  var $row = document.createElement('div');
  $row.setAttribute('class', 'row');
  $root.appendChild($row);

  var $columnHalfImg = document.createElement('div');
  $columnHalfImg.setAttribute('class', 'column-half');
  $row.appendChild($columnHalfImg);

  var $img = document.createElement('img');
  $img.setAttribute('src', entry.photoUrl);
  $columnHalfImg.appendChild($img);

  var $columnHalfText = document.createElement('div');
  $columnHalfText.setAttribute('class', 'column-half');
  $row.appendChild($columnHalfText);

  var $h3 = document.createElement('h3');
  $h3.textContent = entry.title;
  $columnHalfText.appendChild($h3);

  var $p = document.createElement('p');
  $p.textContent = entry.notes;
  $columnHalfText.appendChild($p);

  return $root;
}

document.addEventListener('DOMContentLoaded', function appendEntry() {
  for (var i = 0; i < data.entries.length; i++) {
    $entryList.appendChild(renderEntry(data.entries[i]));
  }
});

document.addEventListener('click', function switchViews(event) {
  if (event.target.matches('a')) {
    var $dataViewEventTarget = event.target.getAttribute('data-view');
    for (var i = 0; i < $viewNodeList.length; i++) {
      if ($dataViewEventTarget === $viewNodeList[i].getAttribute('data-view')) {
        $viewNodeList[i].className = 'view';
      } else {
        $viewNodeList[i].className = 'view hidden';
      }
    }
  }
});
