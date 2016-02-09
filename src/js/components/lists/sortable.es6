// react
import React from 'react';

const {
  createClass,
  Children
} = React;

// sub components
import HeaderCell from './sortable-table-header-cell';

// component
const Sortable = createClass({

  displayName: "Sortable",

  getInitialState() {
    return {
      loading: true,
      sort: {
        key: null,
        order: null
      }
    };
  },

  handleSort(sort) {
    this.setState({
      loading: true,
      sort: sort
    });
  },

  _getHeaderCells(children) {
    return Children.map(children, (child) => {
      if (child.type === 'th') {
        return (
          <HeaderCell 
            {...child.props} 
            {...this.state}
            actions={{
              sort: this.handleSort
            }}
          >
            {child.props.children}
          </HeaderCell>
        );
      }
    });
  },

  _getHeaderRow(children) {
    return Children.map(children, (child) => {
      if (child.type === 'tr') {
        return (
          <tr {...child.props}>
            {this._getHeaderCells(child.props.children)}
          </tr>
        );
      }
    });
  },

  _getHeader(children) {
    return Children.map(children, (child) => {
      if (child.type === 'thead') {
        return (
          <thead {...child.props}>
            {this._getHeaderRow(child.props.children)}
          </thead>
        );
      }
    });
  },

  _getValue(children, key) {
    let value = null;

    Children.forEach(children, (child) => {
      if (child.props[key]) {
        value = child.props[key];
      }
    });

    return value;
  },

  _getBodyRows(children) {
    const {
      sort
    } = this.state;

    if (sort.key) {
      let sortedChildren = children.sort((child, nextChild) => {
        let val = this._getValue(child.props.children, sort.key);
        let nextVal = this._getValue(nextChild.props.children, sort.key);

        if (typeof val === 'string') {
          return val.localeCompare(nextVal);
        } else if (typeof val === 'number') {
          return val - nextVal;
        } else {
          return val;
        }
      });

      if (sort.order === 'desc') {
        sortedChildren = sortedChildren.reverse();
      }

      return sortedChildren;
    } else {
      return children;
    }
  },

  _getBody(children) {
    return Children.map(children, (child) => {
      if (child.type === 'tbody') {
        return (
          <tbody {...child.props}>
            {this._getBodyRows(child.props.children)}
          </tbody>
        );
      }
    });
  },

  children() {
    let parsedTable;

    Children.forEach(this.props.children, (child) => {
      if (child.type === 'table') {
        parsedTable = (
          <table {...child.props}>
            {this._getHeader(child.props.children)}
            {this._getBody(child.props.children)}
          </table>
        );
      }
    });

    return parsedTable;
  },

  render() {
    return this.children();
  }
});

export default Sortable;
