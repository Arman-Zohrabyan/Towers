export default {
    setDangerousHtml: (html, el) => {
        if (el === null) return;
        const range = document.createRange();
        range.selectNodeContents(el);
        range.deleteContents();
        el.appendChild(range.createContextualFragment(html));
    }
};
