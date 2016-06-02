import React from 'react'
import {decorateWithState} from "commons/utils"
import {InViewport} from "commons/viewport/components"
import {RaisedButton,LinearProgress} from "material-ui"

export default decorateWithState(({state, setState, action, haveMore}) => {
  const doLoadMore = () => {
    setState({loading:true})
    action().then(() => setState({loading: false}))
  }

  return (haveMore && <InViewport onIn={doLoadMore}>
    {state.loading ? <LinearProgress/> : <div className="Pagination-loadMore-container">
      <RaisedButton label="Загрузить ещё" fullWidth={true} className="Pagination-loadMore-btn" onClick={ doLoadMore }/>
    </div>}
  </InViewport>)
})