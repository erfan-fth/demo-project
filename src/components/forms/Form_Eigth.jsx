import React from 'react';
import { DocumentEditorContainerComponent, Toolbar, Inject } from '@syncfusion/ej2-react-documenteditor';
import '../../app.css';

const Form_Eight = () => {

    let editorObj
    const onSave = () => {
        editorObj?.documentEditor.save("Sample", "Docx");
    }
    return (
        <div className="App">
            <button onClick={onSave} style={{ marginBottom: 10 }} type="primary" className="bg-blue-500" >Save</button>
            <DocumentEditorContainerComponent ref={(ins => editorObj = ins)} height='560' width='1200' enableToolbar={true}
                serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/documenteditor/">
                <Inject services={[Toolbar]}></Inject>
            </DocumentEditorContainerComponent>
        </div>
    );
}



export default Form_Eight