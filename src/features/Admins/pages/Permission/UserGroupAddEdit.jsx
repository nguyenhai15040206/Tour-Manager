import React from "react";
import PropTypes from "prop-types";
import ModalControl from "../../components/Customs/ModalControl";
import { Col, FormGroup, Row } from "reactstrap";
import { FastField } from "formik";
import InputField from "../../../../CustomFields/InputField/Index";
import * as yup from "yup";
import { useSelector } from "react-redux";
import Loading from "../../../../components/Loading/Index";
//===
const styles = {
  display: "flex",
  justifyContent: "flex-start",
  alignItem: "center",
};

const validationSchema = yup.object().shape({
  UserGroupName: yup
    .string()
    .trim()
    .max(50, ["Không vượt quá 50 kí tự"])
    .required("[Tên nhóm quyền] không được để trống"),
  //gender: yup.bool().required("[Giới tính] không hợp lệ"),
});
function UserGroupAddEdit(props) {
  const {
    initialValues,
    onSubmitForm,
    onSubmitFormAndCreate,
    onSubmitFormAndClose,
  } = props;
  const { loading } = useSelector((state) => state.permission);

  const handleClickOnSubmit = async (e) => {
    if (onSubmitForm) {
      onSubmitForm(e);
    }
  };
  const handleClickOnSubmitAndCreate = async (e) => {
    if (onSubmitFormAndCreate) {
      onSubmitFormAndCreate(e);
    }
  };
  const handleClickOnSubmitAndClose = async (e) => {
    if (onSubmitFormAndClose) {
      onSubmitFormAndClose(e);
    }
  };

  const title =
    initialValues?.UserGroupID !== ""
      ? "Cập nhật nhóm quyền"
      : "Thêm mới nhóm quyền";
  return (
    <>
      {loading === "loading" && <Loading loading={true} />}
      <ModalControl
        backdrop={"static"}
        style={{
          justifyContent: "start",
          padding: "2px 10rem 3px 5rem",
          backgroundColor: "#fff",
        }}
        className="modal-md"
        toggle={props.toggle}
        showModal={props.showModal}
        initialValues={initialValues}
        validationSchema={validationSchema}
        HandleClickSave={handleClickOnSubmit}
        HandleClickSaveAndCreated={handleClickOnSubmitAndCreate}
        HandleClickSaveAndClosed={handleClickOnSubmitAndClose}
        titlePopup={title}
      >
        <Row>
          <Col>
            <FormGroup style={styles}>
              <div style={{ width: "150px" }}>
                <label className="h-label">Mã nhóm quyền</label>
              </div>
              <div style={{ width: "calc(100% - 150px)" }}>
                <FastField
                  className="h-textbox"
                  name="UserGroupID"
                  component={InputField}
                  disabled={true}
                ></FastField>
              </div>
            </FormGroup>
            <FormGroup style={styles}>
              <div style={{ width: "150px" }}>
                <label className="h-label h-lable-Obligatory">
                  Tên nhóm quyền
                </label>
              </div>
              <div style={{ width: "calc(100% - 150px)" }}>
                <FastField
                  className="h-textbox"
                  name="UserGroupName"
                  component={InputField}
                ></FastField>
              </div>
            </FormGroup>
          </Col>
        </Row>
      </ModalControl>
    </>
  );
}

UserGroupAddEdit.propTypes = {
  initialValues: PropTypes.object.isRequired,
  onSubmitForm: PropTypes.func,
  onSubmitFormAndCreate: PropTypes.func,
  onSubmitFormAndClose: PropTypes.func,
};
UserGroupAddEdit.defaulProps = {
  onSubmitForm: null,
  onSubmitFormAndCreate: null,
  onSubmitFormAndClose: null,
};

export default UserGroupAddEdit;
