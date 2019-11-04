import React, {Component} from 'react';
import {View,ScrollView,Text} from 'react-native';
import Input  from './components/Input';
import Card from './components/Card';
import CardSection from './components/CardSection';
import Button  from './components/Button';
import Header from './components/Header';







export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      apidata: [],
      naddata: []
    }
}


  state = {username : '',password : '',email : '',id: ''};
  

  getButton(){
    
      fetch('http://192.168.0.215:8000/users', {
         method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
         console.log(responseJson);
         this.setState({
          apidata: responseJson
         })
      })
      .catch((error) => {
         console.error(error);
      });

  }

  saveUsers(){
    fetch('http://192.168.0.215:8000/saveuser',{
      method:'POST',
      headers:{
        'Accept':'application/json',
        'content-type': 'application/json'
      },
      body:JSON.stringify({name:this.state.username,email:this.state.email,password:this.state.password})
    }).then((response) => response.json())
    .then((responseJson) => {
       console.log(responseJson);
      
       console.log(this.state.naddata);
       this.setState({username:''});
       this.setState({email:''});
       this.setState({password:''});
       this.getButton();
    })
    .catch((error) => {
       console.error(error);
    });
  }

    editUsers(id)
   {

    this.setState({id:id});

    fetch('http://192.168.0.215:8000/user/'+id,{
      method:'GET',
    }).then((response) => response.json())
    .then((responseJson) => {
       console.log(responseJson);
       this.setState({username:responseJson[0].name});
       this.setState({email:responseJson[0].email});
       this.setState({password:responseJson[0].password});
       this.setState({id:responseJson[0].id});
      
    })
    .catch((error) => {
       console.error(error);
    });
   }


   deleteUser(id)
   {

    fetch('http://192.168.0.215:8000/userdelete/'+id,{
      method:'GET',
    }).then((response) => response.json())
    .then((responseJson) => {
       console.log(responseJson);

       this.getButton();
    })
    .catch((error) => {
       console.error(error);
    });
   }


    updateUser(){
      fetch('http://192.168.0.215:8000/updateuser',{
      method:'POST',
      headers:{
        'Accept':'application/json',
        'content-type': 'application/json'
      },
      body:JSON.stringify({id:this.state.id,name:this.state.username,email:this.state.email,password:this.state.password})
    }).then((response) => response.json())
    .then((responseJson) => {
       console.log(responseJson);
       this.setState({username:''});
       this.setState({email:''});
       this.setState({password:''});

       this.getButton();
    })
    .catch((error) => {
       console.error(error);
    });
    }


  render() {

    const data = this.state.apidata;

    let dataDispalay = data.map((response) => {

        return(
          <Card key={response.id}>
              <CardSection>
              <Text>{response.email} | </Text>
              <Text>{response.name} | </Text>
              <Text>{response.password}</Text>
               
              </CardSection>
              <Button onPress={this.editUsers.bind(this,response.id)}>
              Edit  User
          </Button>
          <Button onPress={this.deleteUser.bind(this,response.id)}>
            Delete  User
        </Button>
          </Card>
        );

    });

    return (

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Header headerText="My Crud" />
      <Card>
      <CardSection>
      <Input value={this.state.username} onChangeText = { val => this.setState({username:val}) } placeholder=" Enter User Name" label=" User Name" />
      </CardSection>
      <CardSection>
      <Input secureTextEntry={true} value={this.state.password} onChangeText = { val => this.setState({password:val}) } placeholder=" Enter Password" label=" Password" />
      </CardSection>
      <CardSection>
      <Input value={this.state.email} onChangeText = { val => this.setState({email:val}) } placeholder=" Enter Email" label=" Email" />
      </CardSection>
      <CardSection>
      <Button onPress={this.getButton.bind(this)}>
         Get Users
      </Button>
      <Button onPress={this.saveUsers.bind(this)}>
        Save User
    </Button>

    <Button onPress={this.updateUser.bind(this)}>
        Update User
    </Button>
      </CardSection>
      </Card>
           {dataDispalay}
    </ScrollView>
    );
  }
}

const styles = {
  contentContainer: {
    paddingVertical: 20
  }
};

