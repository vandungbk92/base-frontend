import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  FormFeedback
} from 'reactstrap';

class _FormGroup extends React.Component {
  constructor() {
    super();
    this.state = {};

  }

  componentDidMount() {

  }

  onChange(event) {
    let id = event.target.id, value = event.target.value
    this.props.onChange(id, value)
  }

  render() {
    return (
      <FormGroup row>
        <Col md={this.props.md || null} xs={this.props.xs || null}>
          <Label htmlFor={this.props.id}>{this.props.label}</Label>
        </Col>
        <Col md={12 - (this.props.md)} xs={12 - (this.props.xs)}>
          <Input type={this.props.type}
                 id={this.props.id}
            //name={this.props.id}
                 placeholder={this.props.label}
                 value={this.props.value || ''}
                 onChange={this.onChange.bind(this)}
                 required={this.props.required}
                 disabled={this.props.disabled}/>
          <FormFeedback className="help-block">{`Vui lòng nhập ${this.props.label}`}</FormFeedback>
          {/*<FormFeedback valid className="help-block">Input provided</FormFeedback>*/}
        </Col>
      </FormGroup>
    );
  }
}

_FormGroup.defaultProps = {
  required: false,
  disabled: false,
  type: 'text',
  md: 3,
  xs: 12
};

export default (_FormGroup);