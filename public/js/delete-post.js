window.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('#delete-post');

    btn.addEventListener('click', () => {
        fetch(`/posts/${btn.getAttribute('data-id')}`, {
            method: 'DELETE',
        })
            .then(res => {
                return res.json();
            })
            .then(json => {
                window.location = json.redirect;
            })
            .catch(console.log);
    });
});