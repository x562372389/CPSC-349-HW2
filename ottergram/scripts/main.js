var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';

var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;

var PREVIOUS_IMAGE_SELECTOR = '[button-role="previous"]';
var NEXT_IMAGE_SELECTOR = '[button-role="next"]';
var DETAIL_IMAGE_INDEX = 0;


function setDetails(imageUrl, titleText) {
    'use strict';

    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageUrl);

    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}

function imageFromThumb(thumb) {
    'use strict';
    return thumb.getAttribute('data-image-url');
}

function titleFromThumb(thumb) {
    'use strict';
    return thumb.getAttribute('data-image-title');
  }

function setDetailsFromThumb(thumb) {
    setDetails(imageFromThumb(thumb), titleFromThumb(thumb));
}

function addThumbClickHandler(thumb) { 
    'use strict';
    thumb.addEventListener('click', function(event) {
        event.preventDefault();
        console.log('clicked');
        setDetailsFromThumb(thumb);
        showDetails();
    });
}

function getThumbnailsArray() { 
    'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbnailArray = [].slice.call(thumbnails);
    return thumbnailArray;
}

function hideDetails() {
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
    'use strict';

    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
    frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(function() {
        frame.classList.remove(TINY_EFFECT_CLASS);
    }, 50);
}

function addKeyPressHandler() { 
    'use strict';
    document.body.addEventListener('keyup', function(event) {
        event.preventDefault();
        console.log(event.keyCode);
        if (event.keyCode === ESC_KEY) { 
            hideDetails();
        }
    });
}

function setDetailImageIndex(index) {
    'use strict';
    return function(){
      DETAIL_IMAGE_INDEX = index;
    };
  }

function initializeEvents() {
    'use strict';

    var thumbnails = getThumbnailsArray();
    thumbnails.forEach(addThumbClickHandler);
    addKeyPressHandler();

    for (var i = 0; i < thumbnails.length; i++) {
        thumbnails[i].addEventListener('click', setDetailImageIndex(i));
      }
    
      var previousButton = document.querySelector(PREVIOUS_IMAGE_SELECTOR);
      previousButton.addEventListener('click', function (event) {
          event.preventDefault();
          prev();
      });
    
      var nextButton = document.querySelector(NEXT_IMAGE_SELECTOR);
      nextButton.addEventListener('click', function (event) {
          event.preventDefault();
          next();
        });
}

function prev() {
    'use strict';
    var thumbnails = getThumbnailsArray();
    if (DETAIL_IMAGE_INDEX === 0) {
        DETAIL_IMAGE_INDEX = thumbnails.length - 1;
    } else {
        DETAIL_IMAGE_INDEX--;
    }
    setDetailsFromThumb(thumbnails[DETAIL_IMAGE_INDEX]);
    showDetails();
  }
  
  function next() {
    'use strict';
    var thumbnails = getThumbnailsArray();
    if (DETAIL_IMAGE_INDEX === thumbnails.length - 1) {
        DETAIL_IMAGE_INDEX = 0;
    } else {
        DETAIL_IMAGE_INDEX++;
    }
    setDetailsFromThumb(thumbnails[DETAIL_IMAGE_INDEX]);
    showDetails();
  }

initializeEvents();