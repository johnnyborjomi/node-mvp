import './scss/index.scss';
import 'materialize-css';

import {formHandler} from './components/subscribe-form';

import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header'; 
import List from '@editorjs/list'; 


document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.carousel-slider');

    if(slider) {
        const instance = M.Carousel.init(slider, {
            fullWidth: true,
            indicators: true
        });
    }

    const elems = document.querySelectorAll('.sidenav');
    if(elems) {
        const instances = M.Sidenav.init(elems);
    }   

    const sbscrbForm = document.getElementById('subscribe');
    if(sbscrbForm) {
        formHandler(sbscrbForm);
    }

    const selects = document.querySelectorAll('select');
    if (selects.length) {
        console.log(selects)
        M.FormSelect.init(selects, {});
    }

    
    const editorElem = document.querySelector('#editorjs');
    const formWithEditor = document.querySelector('.form-with-editor');

    if(editorElem && formWithEditor) {
        let data = null;
        if (formWithEditor.elements.text.value) {
            try {
                data = { blocks: JSON.parse(formWithEditor.elements.text.value) };
            } catch(e) {
                data = {
                    blocks: [
                        {
                            type: "paragraph",
                            data:{
                                text: formWithEditor.elements.text.value
                            }
                        }
                    ]
                }
            }
        } 
        
        const editor = new EditorJS({
            holder: 'editorjs',
            tools: { 
                header: {
                  class: Header, 
                  inlineToolbar: ['link'] 
                }, 
                list: { 
                  class: List, 
                  inlineToolbar: true 
                } 
            },
            data: data,
            placeholder: 'Let`s add an awesome carrier text!' 
        });

        formWithEditor.addEventListener('submit', e => {
            e.preventDefault();
            console.log('submit');
            editor.save().then((outputData) => {
                console.log('Article data: ', JSON.stringify(outputData.blocks));
                if (outputData.blocks.length) {
                    let textInput = formWithEditor.elements.text;
                    textInput.value = JSON.stringify(outputData.blocks);
                    formWithEditor.submit();
                } else {
                    textInput = '';
                    //TODO: add complete required field message
                    console.log('Fill all fields');
                }
            }).catch((error) => {
                console.log('Saving failed: ', error)
            });
        });
    }
});