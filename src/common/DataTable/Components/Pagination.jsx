import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Pagination as Pag,
  PaginationItem,
  PaginationLink,
  CardTitle
} from 'reactstrap';

export default class Pagination extends Component {
  static propTypes = {
    perPage: PropTypes.number,
    data: PropTypes.array,
    total: PropTypes.number,
    request: PropTypes.func,
    isFiltered: PropTypes.bool
  };

  state = {
    total: Number(this.props.total) || 0,
    currentPage: 1,
    page: 0,
    perPage: Number(this.props.perPage) || 10,
    lastPage: null,
    totalData: [],
    data: [],
    isFiltered: false
  };

  componentDidMount() {
    this.setState({
      total: this.props.total,
      totalData: this.props.data
    });
    this.pageRequest(1);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.data !== prevState.totalData) {
      this.setState(
        {
          ...prevState,
          total: this.props.total,
          totalData: this.props.data,
          isFiltered: this.props.isFiltered
        },
        () => {
          this.pageRequest(1);
        }
      );
    }
  }

  handleClick = type => {
    if (type === 'prev') {
      if (this.state.currentPage !== 1) {
        this.pageRequest(this.state.currentPage - 1);
      }
    } else if (type === 'next') {
      if (this.state.currentPage !== this.state.lastPage) {
        this.pageRequest(this.state.currentPage + 1);
      }
    }
  };

  render() {
    const { page, perPage, total } = this.state;
    const text = `Showing from ${page} to ${
      perPage + page > total ? total : perPage + page
    } of ${total}`;
    return (
      <>
        <CardTitle>{text}</CardTitle>
        <Pag>{this.calcPagination()}</Pag>
      </>
    );
  }

  pageRequest = pageNumber => {
    const page = (pageNumber - 1) * this.state.perPage;
    const data = this.props.data.slice(
      (pageNumber - 1) * this.state.perPage,
      pageNumber * this.state.perPage
    );
    this.setState({
      currentPage: pageNumber,
      lastPage: Math.ceil(this.state.total / this.state.perPage),
      page: page,
      data: data,
      dataLoaded: true
    });
    this.props.request(data);
  };

  calcPagination = () => {
    let renderPageNumbers;
    const pageNumbers = [];
    if (this.state.total !== 0) {
      for (
        let i = 1;
        i <= Math.ceil(this.state.total / this.state.perPage);
        i++
      ) {
        pageNumbers.push(i);
      }
      let counter = 0;
      renderPageNumbers = pageNumbers.map(number => {
        counter++;
        if (
          counter === pageNumbers[0] ||
          counter === pageNumbers.length ||
          (counter <= pageNumbers[0] + 3 &&
            this.state.currentPage <= pageNumbers[0] + 3) ||
          (counter > this.state.currentPage - 3 &&
            counter < this.state.currentPage + 3 &&
            counter >= pageNumbers[0] + 2)
        ) {
          return (
            <PaginationItem
              key={number}
              active={this.state.currentPage === number}>
              <PaginationLink onClick={() => this.pageRequest(number)}>
                {number}
              </PaginationLink>
            </PaginationItem>
          );
        } else if (
          counter === pageNumbers.length - 1 ||
          (this.state.currentPage > pageNumbers[0] + 3 &&
            counter === pageNumbers[0] + 1)
        ) {
          return (
            <PaginationItem key={number}>
              <PaginationLink>...</PaginationLink>
            </PaginationItem>
          );
        }
        return undefined;
      });
    }
    return (
      <>
        {this.state.totalData.length !== 0 && this.state.currentPage !== 1 ? (
          <PaginationItem>
            <PaginationLink previous onClick={() => this.handleClick('prev')} />
          </PaginationItem>
        ) : (
          <PaginationLink style={{ visibility: 'hidden' }}>''</PaginationLink>
        )}
        {renderPageNumbers}
        {this.state.totalData.length > this.state.perPage &&
        this.state.currentPage !== this.state.lastPage ? (
          <PaginationItem>
            <PaginationLink next onClick={() => this.handleClick('next')} />
          </PaginationItem>
        ) : (
          ''
        )}
      </>
    );
  };
}
