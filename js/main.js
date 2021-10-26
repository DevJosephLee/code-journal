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
var $entriesButton = document.querySelector('.entries-button');
var $newButton = document.querySelector('.new-button');

$photoUrl.addEventListener('input', function setImgUrl(event) {
  if ($photoUrl.value !== '') {
    $img.setAttribute('src', $photoUrl.value);
  } else {
    $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  }
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

  switchViews('entries');

  if (data.entries.length > 0) {
    $noEntriesMessage.className = 'view hidden';
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
  switchViews(data.view);
  for (var i = 0; i < data.entries.length; i++) {
    $entryList.appendChild(renderEntry(data.entries[i]));
  }
  if (data.entries.length > 0) {
    $noEntriesMessage.className = 'view hidden';
  }
});

function switchViews(viewName) {
  for (var i = 0; i < $viewNodeList.length; i++) {
    if ($viewNodeList[i].getAttribute('data-view') === viewName) {
      $viewNodeList[i].className = 'view';
    } else {
      $viewNodeList[i].className = 'view hidden';
    }
  }
  data.view = viewName;
}

function entriesButtonClick(event) {
  switchViews('entries');
}

function newButtonClick(event) {
  switchViews('entry-form');
}

$entriesButton.addEventListener('click', entriesButtonClick);
$newButton.addEventListener('click', newButtonClick);
