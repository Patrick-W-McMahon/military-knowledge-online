import React, { useState, useEffect } from "react";

function AceEditor(props) {
  const [EditorComponent, setEditorComponent] = useState(null);

  useEffect(() => {
    import("react-ace").then(async(module) => {
        await import("ace-builds/src-noconflict/mode-java");
        await import("ace-builds/src-noconflict/theme-github");
        await import("ace-builds/src-noconflict/ext-language_tools");
        setEditorComponent(() => module.default);
    });
  }, []);
  return EditorComponent ? <EditorComponent {...props} /> : null;
}

export default AceEditor;