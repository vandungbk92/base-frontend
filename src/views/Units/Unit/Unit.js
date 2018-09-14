import React, {Component} from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Table,
  Badge,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Button
} from 'reactstrap';
import classnames from 'classnames';
import {RESOURCE} from "../../../common/resource";

class Unit extends Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      activeTab: '1',
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs={12}>
            <Card>
              <CardHeader>
                <strong><i className="icon-home pr-1"></i>Đơn vị: TP Thanh Hóa</strong>
              </CardHeader>
              <CardBody>
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={classnames({active: this.state.activeTab === '1'})}
                      onClick={() => {
                        this.toggle('1');
                      }}
                    >
                      <i className="icon-home"></i> {'\u00A0'} Thông tin
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({active: this.state.activeTab === '2'})}
                      onClick={() => {
                        this.toggle('2');
                      }}
                    >
                      <i className="icon-options"></i>{'\u00A0'} Khác
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1">
                    Thông tin đơn vị
                  </TabPane>
                  <TabPane tabId="2">
                    <Row>
                      Thông tin đơn vị quản lý
                    </Row>
                    <Row>
                      Thông tin đơn vị trực thuộc
                    </Row>
                    <Row>
                      Thông tin chủ đề quản lý
                    </Row>
                  </TabPane>
                </TabContent>
                {/*<Table responsive striped hover>
                    <tbody>
                      {
                        userDetails.map(([key, value]) => {
                          return (
                            <tr key={key}>
                              <td>{`${key}:`}</td>
                              <td><strong>{value}</strong></td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </Table>*/}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Unit;
