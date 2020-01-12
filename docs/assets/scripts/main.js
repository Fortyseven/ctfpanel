'use strict';

function openPopupImage(url)
{
    var popup = document.getElementById('PopupContainer');
    popup.classList.add("open");

    var content = popup.getElementsByClassName('content')[0];
    content.innerHTML = "<div class='img' style='background-image:url("+url+")'/>";
}

function closePopup()
{
    var popup = document.getElementById('PopupContainer');
    popup.classList.remove("open");
}


// Tabs

$(document).ready(function(){
    $("button[data-for-tab]").each(function(i, el) {
        $(el).on('click', function(){
            changePage($(this).attr('data-for-tab'));
        })
    });

    var hash = window.location.hash;

    // remove the hash if we're on the main page
    if (hash == '#main') {
        history.replaceState(null, null, ' ');
        changePage('main', true);
    }
    // otherwise change to that page if we have one
    else if (hash) {
        changePage(hash.substr(1));
    }
    else {
        changePage('main', true);
    }
    //NOTE: Not particularly concerned about invalid pages
});

function changePage(tab_id, skip_hash = false)
{
    $('tabpage').hide();

    $("#"+tab_id).show();

    if(!skip_hash) {
        window.location.hash = tab_id;
    }

    $("tabselector button").removeClass('selected');
    $("tabselector button[data-for-tab='"+tab_id+"'").addClass('selected');
    window.scrollTo(0,0);
}