"use strict";

function openPopupImage(url) {
    let popup = document.getElementById("PopupContainer");
    popup.classList.add("open");

    let content = popup.getElementsByClassName("content")[0];
    content.innerHTML =
        "<div class='img' style='background-image:url(" + url + ")'/>";
}

function closePopup() {
    let popup = document.getElementById("PopupContainer");
    popup.classList.remove("open");
}

// Tabs

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("button[data-for-tab]").forEach(function (el) {
        el.addEventListener("click", function () {
            changePage(this.getAttribute("data-for-tab"));
        });
    });

    let hash = window.location.hash;

    // remove the hash if we're on the main page
    if (hash == "#main") {
        history.replaceState(null, null, " ");
        changePage("main", true);
    }
    // otherwise change to that page if we have one
    else if (hash) {
        changePage(hash.substr(1));
    } else {
        changePage("main", true);
    }
    //NOTE: Not particularly concerned about invalid pages
});

function changePage(tab_id, skip_hash = false) {
    let tabpages = document.querySelectorAll("tabpage");
    tabpages.forEach(function (el) {
        el.style.display = "none";
    });

    let tab = document.getElementById(tab_id);
    if (tab) tab.style.display = ""; // Remove inline style, let CSS handle display

    if (!skip_hash) {
        window.location.hash = tab_id;
    }

    let tabButtons = document.querySelectorAll("tabselector button");
    tabButtons.forEach(function (btn) {
        btn.classList.remove("selected");
    });

    let selectedBtn = document.querySelector("tabselector button[data-for-tab='" + tab_id + "']");
    if (selectedBtn) selectedBtn.classList.add("selected");
    window.scrollTo(0, 0);
}

window.ready = function (fn) {
    if (document.readyState != "loading") {
        fn();
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
};
