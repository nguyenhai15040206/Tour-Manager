import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Editor } from "react-draft-wysiwyg";
import { ContentState, convertToRaw, EditorState } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { FormGroup } from "reactstrap";

function EditorField(props) {
  // const [active, setActive] = useState();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const { field, form, placeholder, className } = props;
  const { name } = field;
  //const { errors, touched } = form;
  //const showError = errors[name] && touched[name];

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
          name={name}
          id={name}
          // onFocus={() => setActive(true)}
          // onBlur={(e) => {
          //   setActive(false);
          //   field.onBlur(e);
          // }}
          editorState={editorState}
          wrapperClassName="wrapper-class"
          editorClassName={`editor-class ${className}`}
          toolbarClassName="toolbar-class"
          onEditorStateChange={(editorState) =>
            onEditorStateChange(editorState)
          }
          placeholder={placeholder}
        ></Editor>
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
