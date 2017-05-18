var React = require('react')

class NewComp extends React.Component{
  render(){
    return <div>
            <h3>New mini component</h3>
            <div>{this.props.ninja}</div>
            <button onClick={()=>this.props.soldier()}>Go</button>
          </div>
  }
}

module.exports = NewComp
