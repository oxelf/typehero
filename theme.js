
export function applyTheme() {
    let theme = localStorage.getItem("theme");
    if (!theme && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        theme = "rose_pine";
    } else if(!theme) {
        theme = "retro_light";
    }
    document.head.insertAdjacentHTML(
        'beforeend',
        '<link rel="stylesheet" href="themes/' + theme + '.css" />');
}
