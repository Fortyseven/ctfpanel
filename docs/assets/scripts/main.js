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