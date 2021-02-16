import M from 'materialize-css';

export default () => {
    const selects = document.querySelectorAll('select');
    if (selects.length) {
        console.log(selects)
        M.FormSelect.init(selects, {});
    }
}    
    
    