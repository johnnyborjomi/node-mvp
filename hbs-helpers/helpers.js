const { compareSync } = require("bcryptjs");
const moment = require('moment');

const dump = (context) => {
    return JSON.stringify(context, null, '\t');
}

const dateFromJSONDate = (jsonDate) => {
    return moment(jsonDate).format("Do MMMM YYYY");
}

const money = (money) => {
    const formatter = new Intl.NumberFormat('us-US', {
        currency: 'USD',
        style: 'currency'
    });
    return formatter.format(Number(money));
}

const selectOptions = (name, selected) => {
    const selects = {
        'locations': [
            "Kharkov, Ukraine",
            "Kiev, Ukraine",
            "Wrozlav, Poland",
            "London, UK",
            "New York, US",
            "Los Angeles, US",
        ],
        'vacancyTypes': [
            "Remote - Full Time",
            "Remote - Part Time",
            "Office - Full Time",
            "Office - Part Time",
        ]
    };

    function checkSelected(item, selected) {
        if (!selected) return false;
        return typeof selected === 'string' ? item === selected : selected.includes(item);
    }

    const html = selects[name].reduce((acc, item) => {
        const isSelected = checkSelected(item, selected) ? 'selected' : '';
        return acc += `<option value="${item}" ${isSelected}>${item}</option>`;
    }, `<option value="" disabled ${selected ? '' : 'selected'}>Choose your option</option>`);
    return html;
}

module.exports = {
    dump,
    dateFromJSONDate,
    money,
    selectOptions
}


