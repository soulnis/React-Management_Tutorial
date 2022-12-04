import logo from './logo.svg';
import './App.css';
import Test from './test.js';
import Customer from './components/Customer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { withStyles} from '@mui/material/styles'
import { CircularProgress } from '@mui/material';
import React from 'react';
import { ClassNames } from '@emotion/react';


const styles = theme =>({
  root:{
     width : '100%' ,
     marginTop : theme.spacing.unit * 3,
     overflowX : "auto"
  },
  table:{
    minwidth : 1080
  },
  progress:{
    margin : theme.spacing.unit * 2
  }
})

class App extends React.Component {

  // 1.constructor()
  // 2.componentWillMount
  // 3.render
  // 4.componentDidMount

  // prps or stats 가 변경되면 shouldcompent
  


  state = {
    customer : '',
    completed : 0
  }

  
  componentDidMount() {
    this.timer = setInterval(this.progress , 20)
    this.CallApi().then( res=>  this.setState({customer:res} ) )
    .catch(err => console.log(err))
   
  }
  
  progress = () => {
    const {completed} = this.state;
    this.setState({completed : completed >= 100 ? 0 :completed +1})
  }

  CallApi = async () => {

    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
 }


  
render () {
  let classNames = this.props.styles
  return (
    <Paper> 
      <Table>
         <TableHead>
             <TableRow>
                <TableCell>번호</TableCell>
                <TableCell>이미지</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>생년월일</TableCell>
                <TableCell>성별</TableCell>
                <TableCell>직업</TableCell>
             </TableRow>

         </TableHead>
         <TableBody>
            { this.state.customer ? this.state.customer.map(c => { return (<Customer key={c.id} id= {c.id} image = {c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job}/>) }) 
            : ''}
         </TableBody>
    

      </Table>
    
       {/* <Customer id= {customer[0].id} image = {customer[0].image} name={customer[0].name} birthday={customer[0].birthday} gender={customer[0].gender} job={customer[0].job} />
       <Customer id= {customer[1].id} image = {customer[1].image} name={customer[1].name} birthday={customer[1].birthday} gender={customer[1].gender} job={customer[1].job} />
       <Customer id= {customer[2].id} image = {customer[2].image} name={customer[2].name} birthday={customer[2].birthday} gender={customer[2].gender} job={customer[2].job} /> */}
    </Paper>
  );
  }
}

export default App;
