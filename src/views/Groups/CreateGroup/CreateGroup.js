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
import {RESOURCE} from "../../../common/resource";
import {connect} from 'react-redux'
import ReactModal from 'react-modal'
import {_FormGroup} from '../../Base'
import {createGroup} from "../../../epics-reducers/serivces/groupServices";

class CreateGroup extends Component {
  constructor(props) {
    super(props);
    this.handleCreateGroup = this.handleCreateGroup.bind(this)
    this.state = {group: {}};
  }

  componentDidMount() {

  }

  componentDidUpdate(prevProps) {

  }

  handleElement(id, value) {
    this.state.group[id] = value;
    this.setState(this.state)
  }

  handleSave() {
    this.handleCreateGroup(this.state.group, CONSTANTS.EXIT)

  }

  handleSaveAndContinue() {
    this.handleCreateGroup(this.state.group, CONSTANTS.CONTINUE)
  }

  async handleCreateGroup(data, type) {
    console.log(data, type)
    let group = await createGroup(data)
    if (group) {
      // tạo thành công
      this.state.group = {};
      this.setState(this.state)
      alert('Thành công')
      if (type === CONSTANTS.EXIT) {
        this.props.handleShowModal()
      }
    } else {
      // tạo lỗi
      alert('Lỗi')
    }
    //this.setState({isShowCreateGroup: type === CONSTANTS.CONTINUE})
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
          <strong>Thêm nhóm</strong>
          <Button color="danger" onClick={this.props.handleShowModal}><i
            className="cui-circle-x icons d-block"></i> </Button>
        </div>
        <div className="modal-body">
          <CardBody>
            <Form action="" method="" encType="multipart/form-data" className="form-horizontal">
              <_FormGroup md="3" label={RESOURCE[0].code}
                          type="text"
                          id="code"
                          disabled={false}
                          required={true}
                          onChange={this.handleElement.bind(this)}
                          value={this.state.group.code || ''}/>
              <_FormGroup md="3" label={RESOURCE[0].groupName}
                          type="text"
                          id="name"
                          disabled={false}
                          required={true}
                          onChange={this.handleElement.bind(this)}
                          value={this.state.group.name || ''}/>
              <_FormGroup md="3" label={RESOURCE[0].description}
                          type="text"
                          id="description"
                          disabled={false}
                          required={false}
                          onChange={this.handleElement.bind(this)}
                          value={this.state.group.description || ''}/>
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


export default connect(mapStateToProps)(CreateGroup);
