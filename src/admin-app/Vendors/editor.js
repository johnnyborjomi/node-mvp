import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header'; 
import List from '@editorjs/list'; 

export default () => {
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
}