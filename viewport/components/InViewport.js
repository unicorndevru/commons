import React from 'react'

const checkVisible = (elm) => {
    if(typeof document !== 'undefined'){
        const rect = elm.getBoundingClientRect();
        const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
        return !(rect.bottom < 0 || rect.top - viewHeight >= 0);

    } else return false
}

export default React.createClass({
    getInitialState: () => ({
        inViewport: false
    }),

    handleViewportChange: function(e) {
        const inViewport = checkVisible(this.refs.inport)
        if(this.state.inViewport !== inViewport) {
            this.setState({inViewport})
            const fn = inViewport ? "onIn" : "onOut"
            this.props[fn] && this.props[fn].apply()
        }
    },

    componentDidMount: function() {
        window && window.addEventListener('scroll', this.handleViewportChange) && window.addEventListener('resize', this.handleViewportChange);
    },

    componentWillUnmount: function() {
        window && window.removeEventListener('scroll', this.handleViewportChange) && window.removeEventListener('resize', this.handleViewportChange);
    },

    render: function() {
        return (<div ref="inport">{this.props.children || null}</div>)
    }
})