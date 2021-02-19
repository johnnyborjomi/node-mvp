import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header'; 
import List from '@editorjs/list'; 
import {debounce} from 'lodash';

export default () => {
    const editorElem = document.querySelector('#editorjs');
    const editorInput = document.querySelector('.editorjs-textinput');

    var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;

    if(editorElem && editorInput) {
        let data = null;
        if (editorInput.value) {
            try {
                data = { blocks: JSON.parse(editorInput.value) };
            } catch(e) {
                data = {
                    blocks: [
                        {
                            type: "paragraph",
                            data:{
                                text: editorInput.value
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

        function syncInput(e) {
            console.log(e)
            editor.save().then((outputData) => {
                console.log(outputData.blocks, 'Article data: ', JSON.stringify(outputData.blocks));
                editorElem.classList.remove('invalid');
                if (outputData.blocks.length) {
                    nativeInputValueSetter.call(editorInput, JSON.stringify(outputData.blocks));
                    var ev = new Event('change', { bubbles: true});
                    editorInput.dispatchEvent(ev);
                } else {
                    editorElem.classList.add('invalid');
                    editorInput.value = '';
                    //TODO: add complete required field message
                    console.log('Fill all fields');
                }
            }).catch((error) => {
                console.log('Saving failed: ', error)
            });
        }

        editorElem.addEventListener('keydown', debounce(syncInput, 700));
    }
}