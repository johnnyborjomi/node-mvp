import {debounce} from 'lodash';
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import initEditor from '../Vendors/editor';
import initSelect from '../Vendors/m-select';
import Input from '../Components/Input.jsx';
import Checkbox from '../Components/Checkbox.jsx';
import Select from '../Components/Select.jsx';

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

export default props => {
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(async () => {
        const res = await fetch(`/admin-api/vacancy/${props.match.params.id}`);
        const resData = await res.json();
        console.log('data: ', resData);
        setFormData(resData);
        document.title = 'Edit: ' + resData.title;
        setIsLoading(false);
        initEditor();
        initSelect();
    }, []);

    const submitHandler = async (e) => {
        e.preventDefault();
        let data;
        try {
            const res = await fetch(`/admin-api/vacancy/edit`, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': window.csrf
                }
            });
            data = await res.json();
            if(res.status !== 200) {
                handleError(data);
            } else {
                props.history.push(`/vacancy/${data.vacancyId}`);
            }
            
        } catch(e) {
            console.log(e);
            handleError(data);
        }
    }

    const handleError = data => {
        if(data.message) {
            setError(data.message)
        } else {
            setError('Something went wrong!');
        }
    }

    const onInputChange = e => {
        console.log('change: ', e.target.name, e.target.value);
        const newFormData = {...formData};
        switch(e.target.name) {
            case 'published':
                newFormData.published = e.target.checked;
                break;
            case 'location':
                console.log(e.target.selectedOptions)
                newFormData.locations = [...e.target.selectedOptions].map(opt => opt.value);
                
                break;
            default:
                newFormData[e.target.name] = e.target.value
        }
        console.log('newdata: ', newFormData)
        setFormData(newFormData);
    } 

    const debouncedInputChange = debounce(onInputChange, 500);

    return (
        isLoading ? 
            <span>Loading...</span> 
            :
            <>
            <form className="form-with-editor">
                <Input
                    placeholder="Vacancy Title"
                    name="title" 
                    type="text" 
                    required="true"
                    value={formData.title}
                    handler={debouncedInputChange}
                />
                <Input
                    placeholder="Salary Range"
                    name="salary" 
                    type="number" 
                    required="true"
                    value={formData.salary}
                    handler={debouncedInputChange}
                />
                <Select 
                    options={selects.locations}
                    multiple={true}
                    placeholder="Location"
                    name="location"
                    value={formData.locations}
                    handler={debouncedInputChange}
                />
                <Select 
                    options={selects.vacancyTypes}
                    placeholder="Vacancy Type"
                    name="vacancyType"
                    value={formData.vacancyType}
                    handler={debouncedInputChange}
                />
                <label htmlFor="text">Vacancy Text</label>
                <div className="spacer-md"></div>
                <div id="editorjs" className="editorjs"></div>
                <div className="spacer"></div>
                <input 
                    style={{display: 'none'}}
                    name="text" 
                    onChange={onInputChange} 
                    value={formData.text}
                    required 
                    className="editorjs-textinput"/>

                {error ?
                    <p className={'form-message alert'}>
                        {error}
                    </p> : null
                }

                <Checkbox
                     label="Published"
                     name="published" 
                     checked={formData.published}
                     handler={debouncedInputChange}
                />
                <div className="spacer-md"></div>
                <input onClick={submitHandler} type="submit" value="Update Vacancy" className="btn btn-primary"/>
            </form>
            <div className="spacer"></div>
            </>
    );
}