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
  FormFeedback,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap';
import {CONSTANTS} from "../../../common/constants";

class _Pagination extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {

  }

  onPageChange(type) {
    let {total, pageActive, onPageChange} = this.props
    const pagination = Array(total).fill(0).map((e, i) => i + 1);
    let value = 0;
    switch (type) {
      case CONSTANTS.FIRST:
        value = pagination.first()
        break
      case CONSTANTS.PREV:
        value = (pageActive !== pagination.first() ? pageActive - 1 : pageActive)
        break
      case CONSTANTS.NEXT:
        value = (pageActive !== pagination.last() ? pageActive + 1 : pageActive)
        break
      case CONSTANTS.LAST:
        value = pagination.last()
        break
      default:
        return
    }
    onPageChange(value)
  }

  render() {
    let {total, pageActive, onPageChange, showPage} = this.props
    const pagination = Array(total).fill(0).map((e, i) => i + 1)
    return (
      <Pagination className="pull-right">
        <PaginationItem onClick={() => this.onPageChange(CONSTANTS.FIRST)}>
          <PaginationLink tag="button"><i className="fa fa-angle-double-left"></i></PaginationLink>
        </PaginationItem>
        <PaginationItem onClick={() => this.onPageChange(CONSTANTS.PREV)}>
          <PaginationLink tag="button"><i className="fa fa-angle-left"></i> </PaginationLink>
        </PaginationItem>
        {pagination.map((item, index) => {
          if (item <= parseInt(pageActive) + showPage && item >= parseInt(pageActive) - showPage) {
            return (
              <PaginationItem active={item === pageActive} key={index} onClick={() => onPageChange(item)}>
                <PaginationLink tag="button">{item}</PaginationLink>
              </PaginationItem>
            )
          }
        })}
        <PaginationItem onClick={() => this.onPageChange(CONSTANTS.NEXT)}>
          <PaginationLink tag="button"><i className="fa fa-angle-right"></i></PaginationLink>
        </PaginationItem>
        <PaginationItem onClick={() => this.onPageChange(CONSTANTS.LAST)}>
          <PaginationLink tag="button"><i className="fa fa-angle-double-right"></i></PaginationLink>
        </PaginationItem>
      </Pagination>
    );
  }
}

_Pagination.defaultProps = {
  pageActive: 1,
  total: 20,
  showPage: 3
};

export default (_Pagination);