var React = require('react')

class NewSearch extends React.Component{
  constructor(props){
    super(props)
  }

  showSearch(e){
    e.preventDefault()
  }

  render(){
    return(
      <div className="search-header">
        <button>Go</button>
      </div>
    )
  }
}

module.exports = NewSearch
