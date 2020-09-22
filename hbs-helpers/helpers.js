
const dump = (context) => {
    return JSON.stringify(context, null, '\t');
}

const dateFromJSONDate = (jsonDate) => {
    return jsonDate.split('T')[0].split('-').join(' ');
}

const money = (money) => {
    const formatter = new Intl.NumberFormat('us-US', {
        currency: 'USD',
        style: 'currency'
    });
    return formatter.format(Number(money));
}

module.exports = {
    dump,
    dateFromJSONDate,
    money
}