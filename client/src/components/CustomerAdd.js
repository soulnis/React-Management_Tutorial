import React from 'react'
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { withStyles } from "@mui/material/styles";


const styles = theme =>({ hidden : {
     display : 'none'
}})

class CustomerAdd extends React.Component {

     constructor(props){
        super(props)
        this.state = {
            file:null,
            userName : '',
            birthday: '',
            gender : '',
            job : '',
            fileName : '',
            open : false

        }
     }

    handleFormSubmit = (e) =>{
        e.preventDefault();
        this.addCustmoer().then((response)=>{
            console.log(response.data)
            //상위 컴포넌트로부터 이벤트를 통해서 상위 스테이트를 리프레쉬한다.
            this.props.stateRefresh();
        })

        this.setState({
            file:null,
            userName : '',
            birthday: '',
            gender : '',
            job : '',
            fileName : '',
            open : false

        })
        
     
        //window.location.reload();


    }

    handleFileChange = (e)=>{
        e.preventDefault();

        this.setState({
            file : e.target.files[0],
            fileName : e.target.value
        })
    }

    handleValueChange = (e)=>{
        e.preventDefault();
        
        let nextState = {};

        nextState[e.target.name] = e.target.value 
        this.setState(nextState);


    }


    addCustmoer = () => {
        const url = '/api/cumstomers'
        const formData = new FormData();
        formData.append('image',this.state.file);
        formData.append('name',this.state.userName);
        formData.append('birthday',this.state.birthday);
        formData.append('gender',this.state.gender);
        formData.append('job',this.state.job);
        
        const config ={
            headers : {
                'content-type' : 'multipart/form-data'
            }
        }

        return axios.post(url,formData,config)

    }


    handleClickOpen = () => {
        this.setState({open:true})
    }
    handleClickClose = () => {
        this.setState({   file:null,
            userName : '',
            birthday: '',
            gender : '',
            job : '',
            fileName : '',
            open : false })
    }

     render () {

        const {classes} = this.props;
        return (
            <div>
            <Button variant='contained' color='primary' onClick={this.handleClickOpen} >고객 추가하기</Button>
            <Dialog open={this.state.open} onClose={this.handleClickClose}>
               <DialogTitle>고객추가</DialogTitle>
                    <DialogContent>
                        <input style ={{display:'none'}} accept="image/*" type='file' id="raised-button-file"  file={this.state.file} value ={this.state.fileName} onChange={this.handleFileChange}></input><br/> 
                        <label htmlFor="raised-button-file">
                            <Button  variant='contained' component='span' name='file'>
                                {this.state.fileName === '' ?  '파일추가하기' : this.state.fileName}
                            </Button>
                        </label>
                        <br/>
                        <TextField label='이름' type ='text' name ='userName'  value ={this.state.userName} onChange={this.handleValueChange}></TextField><br/>
                        <TextField label='생년월일' name ='birthday'  value ={this.state.birthday} onChange={this.handleValueChange}></TextField><br/>
                        <TextField label='성별'name ='gender'  value ={this.state.gender} onChange={this.handleValueChange}></TextField><br/>
                        <TextField label='직업' name ='job'  value ={this.state.job} onChange={this.handleValueChange}></TextField><br/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant='contained'  color='primary' onClick={this.handleFormSubmit}  >추가</Button>
                        <Button variant='outlined'  color='primary' onClick={this.handleClickClose} >닫기</Button>

                    </DialogActions>
            </Dialog>

            </div>
            // <div>
            // <form onSubmit={this.handleFormSubmit}>
            //     <h1> 고객 추가</h1>
            //     프로필 이미지 : <input type ='file' name ='file'  file={this.state.file} value ={this.state.fileName} onChange={this.handleFileChange}></input><br/>
            //     이름 : <input type ='text' name ='userName'  value ={this.state.userName} onChange={this.handleValueChange}></input><br/>
            //     생년월일 :  <input type ='text' name ='birthday'  value ={this.state.birthday} onChange={this.handleValueChange}></input><br/>
            //     성별 :   <input type ='text' name ='gender'  value ={this.state.gender} onChange={this.handleValueChange}></input><br/>
            //     직업 :  <input type ='text' name ='job'  value ={this.state.job} onChange={this.handleValueChange}></input><br/>

            //     <button type="submit"> 추가하기 </button>
            // </form>
            // </div>
        )
     }

}

export default  CustomerAdd;