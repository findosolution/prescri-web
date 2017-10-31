import React from 'react';
import {connect} from 'react-redux';

import * as actions from 'actions';

export class OrderSearch extends React.Component {
  render() {
    var {searchText, showCompleted, dispatch} = this.props;
    return(
      <div className="container__header">
        <div>
          <input type="search" ref="searchText" value={searchText} placeholder="Search orders by pharmacy" onChange={() => {
              var searchText = this.refs.searchText.value;
              dispatch(actions.setSearchText(searchText));
            }} />
        </div>
        <div>
          <label>
            <input type="checkbox" ref="showCompleted" checked={showCompleted} onChange={() => {
              dispatch(actions.toggleShowCompleted());
            }}/>
          Show completed orders
          </label>
        </div>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    searchText: state.searchText,
    showCompleted: state.showCompleted
  }
})(OrderSearch);
