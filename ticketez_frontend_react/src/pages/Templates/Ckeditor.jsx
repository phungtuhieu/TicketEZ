import React, { useMemo, useCallback } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CustomCKEditor = React.memo(({ value, onChange }) => {
    const handleEditorChange = useCallback((_event, editor) => {
        const data = editor.getData();
        onChange(data);
    }, []);

    const memoizedData = useMemo(() => {
        return value;
    }, [value]);

    return (
        <CKEditor
            editor={ClassicEditor}
            data={memoizedData}
            onChange={handleEditorChange}
            onReady={(editor) => {
                const rootElement = editor.editing.view.document.getRoot();
                if (rootElement) {
                    editor.editing.view.change((writer) => {
                        writer.setStyle('min-height', '250px', rootElement);
                    });
                }
            }}
        />
    );
});

export default CustomCKEditor;
