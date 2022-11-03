
HideMenus();
ShowStory();

function HideMenus() {
    document.querySelectorAll('.menu, .content').forEach(x => {
        x.classList.add('hidden');
    });
}

function ShowStory() {
    document.querySelector('.content-story').classList.remove('hidden');
}

document.querySelectorAll('.button-nav').forEach(x => {
    x.addEventListener('click', () => {
        HideMenus();
        document.querySelector('.menu-' + x.innerText.toLowerCase()).classList.remove('hidden');
    });
});

document.querySelectorAll('.button-content').forEach(x => {
    x.addEventListener('click', () => {
        HideMenus();
        document.querySelector('.content-' + x.innerText.toLowerCase()).classList.remove('hidden');
    });
});