import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Editor } from "react-draft-wysiwyg";
import { ContentState, convertToRaw, EditorState } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { FormGroup } from "reactstrap";

function EditorField(props) {
  const editorRef = useRef();
  const [active, setActive] = useState();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const { field, form, placeholder, className } = props;
  const { name } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];
  // const str = "<p>dsadsadsadssadsad</p>\n<p>absdksds</p>\n";
  // var str2 = str.replace(/\n|\r/g, "");
  // console.log("OK" + str2);
  useEffect(() => {
    if (form.dirty) {
      return;
    }
    if (!field.value) {
      return;
    }
    const contentBlock = htmlToDraft(field.value);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);
    }
  }, [field.value, form.dirty]);

  const onEditorStateChange = (editorState) => {
    changeValue(editorState);
  };
  const changeValue = (editorState) => {
    setEditorState(editorState);
    form.setFieldValue(
      field.name,
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );
  };
  return (
    <>
      <FormGroup className="mt-1">
        <Editor
          ref={editorRef}
          name={name}
          onFocus={() => {
            setActive(true);
          }}
          onBlur={() => {
            setActive(!active);
          }}
          editorState={editorState}
          wrapperClassName="wrapper-class"
          editorClassName={`editor-class ${className}`}
          toolbarClassName="toolbar-class"
          onEditorStateChange={(editorState) =>
            onEditorStateChange(editorState)
          }
          placeholder={placeholder}
        ></Editor>
        {showError && <div className="invalid-feedback">{errors[name]}</div>}
      </FormGroup>
    </>
  );
}

EditorField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

EditorField.defaultProps = {
  placeholder: "",
  className: "",
};

export default EditorField;
