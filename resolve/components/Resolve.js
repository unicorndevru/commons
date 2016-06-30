import React from 'react'
import { connect } from 'react-redux'

import {
 CircularProgress
} from 'material-ui'

const Loading = () => {
  return (<div style={{margin:'auto'}}><CircularProgress/></div>)
}

const mapStateToProps = (state) => ({
  isResolving: state.resolve.resolving,
  currentSaga: state.resolve.currentSaga,
  isClientFirstResolve: state.resolve.isClientFirstResolve
})

export default function RouteResolve(Component, sagaName) {

  const RouteResolveComponent = ({isResolving, currentSaga, ...props}) => {
    if(isResolving && (!sagaName || currentSaga === sagaName)) {
      return <Loading />
    } else {
      return <Component {...props} />
    }
  }

  return connect(mapStateToProps)(RouteResolveComponent)
}
