export const formHandler = (form) => {

    const alertEl = document.querySelector('.js-alert');
    const successEl = document.querySelector('.js-success');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = {};
        data.email = form.elements.email.value;
        const csrf = form.elements._csrf.value;
        let res = await fetch('/mail/subscribe', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': csrf
            }
        });
        res = await res.json();
        if (res.subscribed) {
            form.style.display = 'none';
            successEl.textContent = res.message;
            successEl.style.display = 'block';
            alertEl.style.display = 'none';
        } else {
            form.elements.email.value = '';
            alertEl.textContent = res.message;
            alertEl.style.display = 'block';
            successEl.style.display = 'none';
        }
        console.log(res);
    })
}
