
export function applyTheme() {
    let theme = localStorage.getItem("theme") || "rose_pine";
    document.head.insertAdjacentHTML(
        'beforeend',
        '<link rel="stylesheet" href="themes/' + theme + '.css" />');
}

export function showThemeSelection() {

}