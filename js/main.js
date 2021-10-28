/* global data */
/* exported data */
var $photoUrl = document.querySelector('#url');
var $title = document.querySelector('#title');
var $notes = document.querySelector('#notes');
var $img = document.querySelector('img');
var $form = document.querySelector('form');
var $entryList = document.querySelector('.entry-list');
var $viewNodeList = document.querySelectorAll('.view');
var $noEntriesMessage = document.querySelector('.no-entries-message');
var $entriesButton = document.querySelector('.entries-button');
var $deleteButton = document.querySelector('.delete-button');
var $cancelButton = document.querySelector('.cancel-button');
var $confirmButton = document.querySelector('.confirm-button');
var $newButton = document.querySelector('.new-button');
var $overlay = document.querySelector('div[class="overlay hidden"]');
var $pageTitle = document.querySelector('div[data-view="entry-form"] h1');

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
  if (data.editing !== null) {
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === data.editing.entryId) {
        data.entries[i].title = newEntry.title;
        data.entries[i].photoUrl = newEntry.photoUrl;
        data.entries[i].notes = newEntry.notes;
        var editedEntry = renderEntry(data.entries[i]);
      }
    }
    var replaceEntry = document.querySelector('li[data-entry-id' + '=' + '"' + data.editing.entryId + '"' + ']');
    replaceEntry.replaceWith(editedEntry);
  } else {
    data.nextEntryId++;
    data.entries.unshift(newEntry);
    $img.setAttribute('src', 'images/placeholder-image-square.jpg');
    $entryList.prepend(renderEntry(newEntry));
  }
  if (data.entries.length > 0) {
    $noEntriesMessage.className = 'view hidden';
  }
  $form.reset();
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  switchViews('entries');
  data.editing = null;

});

function renderEntry(entry) {
  var $root = document.createElement('li');
  $root.setAttribute('class', 'margin-bottom-1');
  $root.setAttribute('data-entry-id', entry.entryId);

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

  var $nameIconRow = document.createElement('div');
  $nameIconRow.setAttribute('class', 'row justify-space-between align-items-center');
  $columnHalfText.appendChild($nameIconRow);

  var $h3 = document.createElement('h3');
  $h3.textContent = entry.title;
  $nameIconRow.appendChild($h3);

  var $icon = document.createElement('i');
  $icon.setAttribute('class', 'fas fa-pen');
  $nameIconRow.appendChild($icon);

  var $pRow = document.createElement('div');
  $pRow.setAttribute('class', 'row');
  $columnHalfText.appendChild($pRow);

  var $p = document.createElement('p');
  $p.textContent = entry.notes;
  $pRow.appendChild($p);

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
  $pageTitle.textContent = 'New Entry';
  $deleteButton.classname = 'hidden';
}

function deleteButtonClick(event) {
  $overlay.className = 'overlay view';
}

function deleteCancelButtonClick(event) {
  $overlay.className = 'hidden';
}

function deleteConfirmButtonClick(event) {
  $overlay.className = 'hidden';
  var deleteEntry = document.querySelector('li[data-entry-id' + '=' + '"' + data.editing.entryId + '"' + ']');
  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === data.editing.entryId) {
      data.entries.splice(i, 1);
    }
  }
  deleteEntry.remove();
  if (data.entries.length === 0) {
    $noEntriesMessage.className = 'no-entries-message view';
  }
  switchViews('entries');
}

$entriesButton.addEventListener('click', entriesButtonClick);
$newButton.addEventListener('click', newButtonClick);
$deleteButton.addEventListener('click', deleteButtonClick);
$cancelButton.addEventListener('click', deleteCancelButtonClick);
$confirmButton.addEventListener('click', deleteConfirmButtonClick);

$entryList.addEventListener('click', function clickEdit(event) {
  if (!event.target.matches('i')) {
    return;
  }
  switchViews('entry-form');
  for (var i = 0; i < data.entries.length; i++) {
    if (JSON.stringify(data.entries[i].entryId) === (event.target.closest('li').getAttribute('data-entry-id'))) {
      data.editing = data.entries[i];
    }
  }
  $title.value = data.editing.title;
  $photoUrl.value = data.editing.photoUrl;
  $img.setAttribute('src', $photoUrl.value);
  $notes.value = data.editing.notes;
  $pageTitle.textContent = 'Edit Entry';
  $deleteButton.className = 'delete-button view';
});
