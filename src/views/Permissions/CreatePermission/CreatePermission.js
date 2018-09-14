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

class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {product: {}};
  }

  componentDidMount() {

  }

  componentDidUpdate(prevProps) {

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

        </div>
        <div className="modal-body">
          <CardBody>
            <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
              {/*<FormGroup row>
                <Col md="3">
                  <Label htmlFor="code">Mã sản phẩm</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="text" id="code" name="code" placeholder="Text" disabled
                         onChange={this.handleElement.bind(this)}/>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="name">Tên sản phẩm</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="text" id="name" name="name" placeholder="Text"
                         onChange={this.handleElement.bind(this)}/>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="import_price">Giá nhập sản phẩm</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="number" id="import_price" name="import_price" placeholder="Number"
                         onChange={this.handleElement.bind(this)}/>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="price">Giá bán sản phẩm</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="number" id="price" name="price" placeholder="Number"
                         onChange={this.handleElement.bind(this)}/>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="archive">Tồn kho</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="number" id="archive" name="archive" placeholder="Number"
                         onChange={this.handleElement.bind(this)}/>
                </Col>
              </FormGroup>*/}
              {/*<FormGroup row>
                <Col md="3">
                  <Label htmlFor="date_create">Ngày nhập<Badge>NEW</Badge></Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="date" id="date_create" name="date_create" placeholder="date"
                         value={this.state.product.date_create}/>
                </Col>
              </FormGroup>*/}
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
