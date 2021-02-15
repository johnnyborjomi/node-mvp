import moment from 'moment';
import React from 'react';

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

const editorText = (jsonText) => {
    let text = jsonText;
    try {
        text = JSON.parse(text);
    } catch(err) {
        console.log('its a string');
    }
    if (typeof text === 'string') return text;

    return text.reduce((acc, item) => {
        switch (item.type) {
            case 'header': 
                return acc += `<h${item.data.level}>${item.data.text}</h${item.data.level}>`;
            case 'paragraph': 
                return acc += `<p>${item.data.text}</p>`;
            case 'list': 
                let tag = item.data.type === 'ordered' ? 'ol' : 'ul';
                let lis = item.data.items.reduce((acc, item) => acc += `<li>${item}</li>`, '')
                return acc += `<${tag}>${lis}</${tag}>`;
            default: 
                return '';
        }
    }, '');
}

export {
    dump,
    dateFromJSONDate,
    money,
    selectOptions,
    editorText,
}


