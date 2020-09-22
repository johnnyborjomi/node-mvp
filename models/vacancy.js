const fs = require('fs');
const path = require('path');
const uuid = require('uuid/v4');

const DATA_PATH = path.join(__dirname, '..', 'data', 'vacancies.json');

class Vacancy {
    constructor(title, salary, text) {
        this.title = title;
        this.salary = salary;
        this.text = text;
        this.id = uuid();
        this.createDate = new Date().toJSON();
    }

    async save() {
        const vacancies = await Vacancy.getAll();
        console.log(vacancies);
        vacancies.push(this.getVacancyFields());
        
        return new Promise((resolve, reject) => {
            fs.writeFile(DATA_PATH, JSON.stringify(vacancies, null, '\t'), err => {
                if(err) {
                    reject(err);
                } else {
                    resolve();
                }
            })
        })
    }

    static getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                DATA_PATH,
                'utf-8',
                (err, content) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(JSON.parse(content));
                    }
                }
            );
        })
    }

    static async getById(id) {
        const vacancies = await Vacancy.getAll();
        return vacancies.find(x => x.id === id);
    }

    getVacancyFields() {
        return {
            title: this.title,
            salary: this.salary,
            text: this.text,
            id: this.id,
            createDate: this.createDate
        }
    }
}

module.exports = Vacancy;