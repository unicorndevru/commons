import React from 'react';

const checkVisible = (elm) => {
  if (typeof document !== 'undefined') {
    const rect = elm.getBoundingClientRect();
    const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
  }
  return false;
}

export default React.createClass({
  getInitialState: () => ({
    inViewport: false,
    wasInViewport: false,
    wasOutViewport: false
  }),

  handleViewportChange: function () {
    const inViewport = checkVisible(this.refs.inport)
    
    if (this.state.inViewport !== inViewport) {
      this.setState({ inViewport })
      const fn = inViewport ? 'onIn' : 'onOut'
      this.props[fn] && this.props[fn].apply()

      if(!inViewport && !this.state.wasOutViewport) {
        this.props.onFirstOut && this.props.onFirstOut()
        this.setState({wasOutViewport: true})
      }
    }
    if(inViewport && !this.state.wasInViewport) {
      this.props.onFirstIn && this.props.onFirstIn()
      this.setState({wasInViewport: true})
    }
  },

  componentDidMount: function() {
    window.addEventListener('wheel', this.handleViewportChange)
    window.addEventListener('resize', this.handleViewportChange)
    window.addEventListener('touchmove', this.handleViewportChange)
    window.addEventListener('scroll', this.handleViewportChange)
    window.addEventListener('scrollEnd', this.handleViewportChange)
    this.handleViewportChange()
  },

  componentWillUnmount: function() {
    window.removeEventListener('wheel', this.handleViewportChange)
    window.removeEventListener('resize', this.handleViewportChange);
    window.removeEventListener('touchmove', this.handleViewportChange);
    window.removeEventListener('scroll', this.handleViewportChange);
    window.removeEventListener('scrollEnd', this.handleViewportChange);
  },

  render: function() {
    return (<div ref="inport">{this.props.children || ''}</div>)
  }
})
