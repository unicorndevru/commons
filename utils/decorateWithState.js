import React from "react";
import {map, keys, propOr, merge, equals, pickBy, find, eqProps} from "ramda";


export default (pureRender, {clearOnPropChange = [], initialState = {}} = {}) => React.createClass({
  componentWillReceiveProps: function(nextProps) {
    find((p) => !eqProps(p, this.props, nextProps), clearOnPropChange) && this.setState(map((v) => undefined, this.state))
  },

  getInitialState: () => {
    return initialState
  },

  render: function() {
    const setState = this.setState.bind(this)
    const state = pickBy((v) => v !== undefined, this.state)
    return pureRender({
      ...this.props,
      setState,
      clearState: (init = {}) => {
        setState({
          ...map((v) => undefined, state),
          ...init
        })
      },
      state,
      stateFieldChanged: (fieldName) => (e) => {
        setState({
          ...state,
          [fieldName]: e.target.value
        })
      }
    })
  }
})
