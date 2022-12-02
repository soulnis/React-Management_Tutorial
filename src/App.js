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
import { withStyles } from '@mui/material/styles';




function App() {


  let customer = [{ id:"1", image : "https://placeimg.com/64/64/1" ,name : "홍길덩",birthday : "20221202",gender : "남자",job : "소도둑놈"},
  {id:"2", image : "https://placeimg.com/64/64/2" ,name : "힘길덩",birthday : "20211202",gender : "남자",job : "소도둑놈2"},
  {id:"3", image : "https://placeimg.com/64/64/3" ,name : "김길덩",birthday : "20201202",gender : "여자",job : "소도둑놈3"} ]


  const styles = theme => ({
    root : {
       width : '100%',
       marginTop : theme.spacing.unit * 3,
       overflowX : "auto"
    },
  
    table : {
      minWidth : 1080
    }
  })
  

  return (
    <Paper className = {styles.root}> 
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
            { customer.map(c => { return (<Customer key={c.id} id= {c.id} image = {c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job}/>) }) }
         </TableBody>
    

      </Table>
    
       {/* <Customer id= {customer[0].id} image = {customer[0].image} name={customer[0].name} birthday={customer[0].birthday} gender={customer[0].gender} job={customer[0].job} />
       <Customer id= {customer[1].id} image = {customer[1].image} name={customer[1].name} birthday={customer[1].birthday} gender={customer[1].gender} job={customer[1].job} />
       <Customer id= {customer[2].id} image = {customer[2].image} name={customer[2].name} birthday={customer[2].birthday} gender={customer[2].gender} job={customer[2].job} /> */}
    </Paper>
  );
}

export default App;
