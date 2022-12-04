import React from 'react';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { withStyles } from "@mui/material/styles";

class CustomerDelete extends React.Component {
    constructor(props){
        super(props)
        this.state = {
        
            open : false

        }
     }

    deleteCustomer =(id)=>{
        const url ='/api/customers/' + id;

        fetch(url,{
            method : 'DELETE'
        })

        this.props.stateRefresh();
    }

    handleClickOpen = () => {
        this.setState({open:true})
    }
    handleClickClose = () => {
        this.setState({   
            open : false })
    }

    render(){
        return (
            <div>
            <Button variant='contained' color='primary' onClick={this.handleClickOpen} >삭제하기</Button>  
            <Dialog open={this.state.open} onClose={this.handleClickClose}>
            <DialogTitle>삭제하기</DialogTitle>
            <DialogContent>
                <h3>정말로 데이터를 삭제하시겠습니까?</h3>
            </DialogContent>
              <DialogActions>
                  <Button variant='contained' color='primary' onClick={(e)=>{this.deleteCustomer(this.props.id)}} > 삭제하기</Button>
                  <Button variant='contained' color='primary' onClick={this.handleClickClose}> 취소하기</Button>
              </DialogActions>
            </Dialog>
           </div>
        )
    }

}

export default CustomerDelete