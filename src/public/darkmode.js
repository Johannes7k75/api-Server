function getColorMode() {
    let colorMode = localStorage.getItem('colorMode') || "light";
    localStorage.setItem('colorMode', colorMode);
    return colorMode;
}

function changeColorMode() {
    if (getColorMode() === "light") {
        localStorage.setItem('colorMode', "dark");
    } else {
        localStorage.setItem('colorMode', "light");
    }
    document.documentElement.setAttribute("color-mode", getColorMode());
}

document.documentElement.setAttribute("color-mode", getColorMode());