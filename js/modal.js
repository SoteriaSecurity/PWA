const btn = document.getElementById("infoBox");
const modal = document.getElementById("popup");
const span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    modal.style.display = "block";
}

span.onclick = function() {
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target === modal) {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        modal.style.display = "none";
    }
}
