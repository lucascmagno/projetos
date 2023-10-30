document.addEventListener("DOMContentLoaded", function() {
    const menuToggle = document.getElementById("menu-toggle");
    const ulLink = document.querySelector(".ul-link");

    menuToggle.addEventListener("click", () => {
        ulLink.classList.toggle("show-menu");
    });
});
