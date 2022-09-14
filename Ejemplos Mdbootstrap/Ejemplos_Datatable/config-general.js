
$("#appBody").adjustFontSize();   // Incrementar Tamaño de Fuente

$("body").tooltip({ selector: "[data-toggle=tooltip]", trigger: "hover" });  // Habilitar tooltips

// Menú de navegación

const navbar = document.getElementById("offCanvas");
const overlay = document.querySelector(".navbar-overlay")
const navbarItems = document.querySelectorAll(".nav-item")

function openNav() {
    navbar.classList.add("navbar-offcanvas--visible");
    overlay.style.display = "block";
    $(navbarItems).each(function () {
        $(this).css("display", "block");
    });
}

function closeNav() {
    navbar.classList.remove("navbar-offcanvas--visible");
    overlay.style.display = "none";
    $(navbarItems).each(function () {
        $(this).css("display", "none");
    });
}

overlay.addEventListener("click", closeNav);   // Cierra menú reducido al hacer click fuera de el
