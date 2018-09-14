import React, {Component} from 'react';
import {
  Badge,
  Button,
  ButtonDropdown,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
} from 'reactstrap';

import {CONSTANTS} from "../../../common/constants";
import {connect} from 'react-redux'
import ReactModal from 'react-modal'
import {createUser} from "../../../epics-reducers/serivces/userServices";
import {RESOURCE} from "../../../common/resource";

class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.handleCreateUser = this.handleCreateUser.bind(this)
    this.state = {user: {}};
  }

  componentDidMount() {

  }

  componentDidUpdate(prevProps) {

  }

  handleElement(id, value) {
    this.state.user[id] = value
    this.setState(this.state)
  }

  handleSave() {
    this.handleCreateUser(this.state.user, CONSTANTS.EXIT)
  }

  handleSaveAndContinue() {
    this.handleCreateUser(this.state.user, CONSTANTS.CONTINUE)
  }

  async handleCreateUser(data, type) {
    console.log(data, type)
    let group = await createUser(data)
    if (group) {
      // tạo thành công
      this.state.user = {};
      this.setState(this.state)
      alert('Thành công')
      if (type === CONSTANTS.EXIT) {
        this.props.handleShowModal()
      }
    } else {
      // tạo lỗi
      alert('Lỗi')
    }
    //this.setState({isShowCreateUser: !this.state.isShowCreateUser})
  }

  render() {
    return (
      <ReactModal
        isOpen={this.props.isShowModal}
        contentLabel="Minimal Modal Example"
        className="Modal"
        overlayClassName="Overlay"
        ariaHideApp={false}
      >
        <div className="modal-header">
          <strong>{RESOURCE[0].addUser}</strong>
          <Button color="danger" onClick={this.props.handleShowModal}><i
            className="cui-circle-x icons d-block"></i> </Button>
        </div>
        <div className="modal-body">
          <CardBody>
            <Form action="" method="" encType="multipart/form-data" className="form-horizontal">

            </Form>
          </CardBody>
        </div>
        <div className="modal-footer">
          <Button color="primary" size="sm" className="pull-right" onClick={this.handleSave.bind(this)}>
            <i className="fa fa-floppy-o"></i>&nbsp;Lưu
          </Button>
          <Button color="primary" size="sm" className="pull-right" onClick={this.handleSaveAndContinue.bind(this)}>
            <i className="fa fa-floppy-o"></i>&nbsp;Lưu và tiếp tục
          </Button>
          <Button color="danger" className="pull-right" onClick={this.props.handleShowModal}>
            <i className="cui-circle-x icons d-block"></i>
          </Button>
        </div>
      </ReactModal>
    )
  }
}

function mapStateToProps(state) {
  return {}
}


export default connect(mapStateToProps)(CreateUser);
