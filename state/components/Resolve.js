import React from 'react'
import { connect } from 'react-redux'

import {
 CircularProgress
} from 'material-ui'

const Loading = () => {
  return (<div style={{margin:'auto'}}><CircularProgress/></div>)
}

const mapStateToProps = (state) => ({
  isResolving: state.state.resolving,
  currentSaga: state.state.currentSaga,
  isClientFirstResolve: state.state.isClientFirstResolve
})

export default function RouteResolve(Component, sagaName) {

  const RouteResolveComponent = (props) => {
    const isResolving = props.isResolving && (!sagaName || props.currentSaga === sagaName)

    if(isResolving) {
      return <Loading {...props}/>
    } else {
      return <Component {...props}/>
    }
  }

  return connect(mapStateToProps)(RouteResolveComponent)
}
