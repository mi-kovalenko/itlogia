import './style.scss'

const closeButton = document.getElementById('close');
const modal = document.getElementById('modal'); 
const form = document.getElementById('form');
const nameField = document.getElementById('name');

closeButton.addEventListener('click', function() {
  modal.classList.remove('modal--open');
})

nameField.addEventListener('input', function(e) {
  this.value = this.value.replace(/\./g, '');
});

form.addEventListener('submit', function(e) {
  e.preventDefault(); 

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "https://echo.htmlacademy.ru", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onload = function() {
    if (xhr.status === 200) {
      modal.classList.add('modal--open');
    } else {
      console.error("Ошибка отправки формы");
    }
  };

  xhr.send(new FormData(form))
})


// Image Enlarger / Lightbox (by iNet / IEVEVO)
// Licenced under MIT Open Source

// Enlarges images on click

var gallery_info = { imgs: [], currentIndex: 0 }, gallery_counter, gallery_buttons;

function id(id) {
    return document.getElementById(id);
}

function displayImg(src) {
    // actually displays the image
    id("enlarged-image").src = src;

    // update counter if applicable
    if (gallery_info.imgs.length > 1) {
        // set the counter
        gallery_counter.innerHTML = (parseInt(gallery_info.currentIndex) + 1) + "/" + gallery_info.imgs.length;

        // show buttons
        for (var i = 0; i < gallery_buttons.length; i++) {
            gallery_buttons[i].classList.remove("hidden");
        }
    } else {
        // hide buttons if there's only 1 image
        for (var i = 0; i < gallery_buttons.length; i++) {
            gallery_buttons[i].classList.add("hidden");
        }
    }
}

function enlargeImg(srcImg) {
    // store metadata
    if (srcImg.getAttribute("data-gallery-index") != null) {
        // if it's a gallery with multiple linked images
        var allImgs = srcImg.parentNode.parentNode.getElementsByClassName("menu__card-img");
        gallery_info.currentIndex = srcImg.getAttribute("data-gallery-index");
        gallery_info.imgs = allImgs;
    } else {
        // if it's a single image
        gallery_info.currentIndex = 0;
        gallery_info.imgs = [srcImg];
    }

    // Actually enlarge the image
    var container = id("enlarged-image").parentNode;
    container.style.display = 'block'; 
    
    var large_src = srcImg.getAttribute("data-large-src") || srcImg.src;
    displayImg(large_src);
    id("enlarged-image").parentNode.classList.add("open");
}

function unenlargeImg() {
    // Close
    id("enlarged-image").parentNode.classList.remove("open");
    var container = id("enlarged-image").parentNode;
    container.classList.remove("open");
    container.style.display = 'none';
}

function nextImage() {
    // Loads the next image in line
    var src = "";

    // change index
    if (gallery_info.currentIndex + 1 >= gallery_info.imgs.length) {
        // if at the end of the queue
        gallery_info.currentIndex = 0;
    } else {
        // if not at end of queue
        gallery_info.currentIndex = parseInt(gallery_info.currentIndex) + 1;
    }

    // if alt SRC supplied, use this
    if (gallery_info.imgs[gallery_info.currentIndex].getAttribute("data-large-src") != null) {
        src = gallery_info.imgs[gallery_info.currentIndex].getAttribute("data-large-src");
    }
    // otherwise, use the src from the img tag
    else {
        src = gallery_info.imgs[gallery_info.currentIndex].src;
    }

    // display image
    displayImg(src);
}

function initialise() {
    // Set up event listeners
    var galleries = document.getElementsByClassName("gallery");

    for (var x = 0; x < galleries.length; x++) {
        // for each gallery
        var galleryItems = galleries[x].getElementsByClassName("menu__card");

        for (var i = 0; i < galleryItems.length; i++) {
            // for each image, add a click listener
            var img = galleryItems[i].getElementsByTagName("img")[0];
            if (img) {
                img.classList.add("menu__card-img"); // Add a class for easy selection
                img.onclick = function () {
                    enlargeImg(this);
                }
            }
        }
    }
}

window.addEventListener("load", function () {
    initialise();

    // Set up big img element
    var el = document.createElement("div"), prevBtn = document.createElement("div"), nextBtn = document.createElement("div"), counter = document.createElement("span");

    // image
    el.innerHTML = "<img class='img-enlarged' id='enlarged-image' />";
    el.classList.add("img-enlarged__cont");
    el.onclick = function () {
        unenlargeImg();
    };

    // prev / next buttons
    prevBtn.innerHTML = "<span></span>";
    prevBtn.classList.add("img-enlarged__nav");
    prevBtn.classList.add("prev");
    prevBtn.onclick = function (event) {
        event.stopPropagation();
        prevImage();
    };

    nextBtn.innerHTML = "<span></span>";
    nextBtn.classList.add("img-enlarged__nav");
    nextBtn.classList.add("next");
    nextBtn.onclick = function (event) {
        event.stopPropagation();
        nextImage();
    };

    el.appendChild(prevBtn);
    el.appendChild(counter);
    el.appendChild(nextBtn);
    document.body.appendChild(el);

    gallery_counter = counter;
    gallery_buttons = [prevBtn, nextBtn];
});
