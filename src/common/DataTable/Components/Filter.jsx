import React, { Component } from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  DropdownToggle,
  DropdownMenu,
  UncontrolledButtonDropdown
} from 'reactstrap';

class Filter extends Component {
  state = {
    receiver: '',
    filterClicked: false,
    columns: [],
    keys: [],
    totalData: [],
    totalRecords: 0
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.data !== prevState.totalData) {
      this.setState({
        columns: prevProps.keys,
        keys: Object.values(prevProps.keys),
        totalData: prevProps.data,
        totalRecords: prevProps.records
      });
    }
  }

  handleReset = () => {
    this.setState({ receiver: '' });
  };

  render() {
    const columns = Object.keys(this.props.keys).map((key, idx) => (
      <FormGroup key={idx} check>
        <Input
          type="checkbox"
          id={`chk-${idx}`}
          name={Object.values(this.props.keys)[idx]}
        />
        <Label htmlFor={`chk-${idx}`}>{key}</Label>
      </FormGroup>
    ));
    return (
      <UncontrolledButtonDropdown>
        <DropdownToggle color="dark" className="btn-shadow">
          Filter
        </DropdownToggle>
        <DropdownMenu
          right
          className="rm-pointers dropdown-menu-lg p-0 border-0 overflow-hidden">
          <div className="p-3">
            <Form onSubmit={this.searchData}>
              <FormGroup>
                <Input
                  type="search"
                  placeholder="Search"
                  value={this.state.receiver}
                  onChange={this.updateInput}
                />
              </FormGroup>
              {columns}
              <div>
                <Button
                  type="reset"
                  className="mr-2"
                  onClick={this.handleReset}>
                  Reset
                </Button>
                <Button type="submit" color="primary">
                  Choose
                </Button>
              </div>
            </Form>
          </div>
        </DropdownMenu>
      </UncontrolledButtonDropdown>
    );
  }

  updateInput = e => {
    this.setState({ receiver: e.target.value });
  };

  searchData = e => {
    e.preventDefault();
    let value = e.target[0].value;
    let i = 0;
    const keys = [];

    while (true) {
      if (e.target[i].type === 'submit' || i > 10) {
        break;
      } else if (e.target[i].checked) {
        keys.push(e.target[i].name);
      }
      i++;
    }
    let data = this.state.totalData;
    if (keys.length > 0) {
      data = this.state.totalData.filter(obj => {
        let result = {},
          counter = 0;
        keys.forEach(key => {
          obj[key] = obj[key] === null ? '' : obj[key];
          if (
            obj[key]
              .toLowerCase()
              .toString()
              .match(value.toLowerCase().toString())
          ) {
            result = obj;
            counter++;
          } else result = {};
        });
        return result === obj && counter >= keys.length;
      });
    }

    this.props.request(data, data.length, true);
    this.setState(prevState => ({
      ...prevState,
      filterClicked: false
    }));
  };
}

export default Filter;
