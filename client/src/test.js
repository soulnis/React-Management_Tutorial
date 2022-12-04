import React from 'react';


class Test extends React.Component {

constructor(props){
    super(props);
    this.state = {open : "하이"}
}
componentDidMount(){
   
    

   this.setState( {open : "바이"});
}
componentDidUpdate(){
    
}

render (){
    return (<div><h1>{this.props.id}</h1><a>{this.state.open}</a></div>);
}

}



export default Test;