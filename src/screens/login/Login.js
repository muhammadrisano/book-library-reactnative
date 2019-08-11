import React, { Component } from 'react';
import { Container, View, Header, H1, H2, H3, Content, Form, Item, Input, Label, Button, Text, Left, Body, Title, Right } from 'native-base';
import { TouchableOpacity, Alert, AsyncStorage, Image, StyleSheet } from 'react-native'
import PasswordInputText from 'react-native-hide-show-password-input';
import { loginUser } from '../../redux/actions/users'
import { connect } from 'react-redux'
// import AsyncStorage from '@react-native-community/async-storage';
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    }
  }
  componentWillUpdate = () => {



  }
  handleLogin = async () => {

    await this.props.dispatch(loginUser({
      email: this.state.email,
      password: this.state.password
    }))
      .then((response) => {
        console.warn(response.action.payload.data.result.card_number)
        AsyncStorage.setItem('token', response.action.payload.data.result.token.toString())
        AsyncStorage.setItem('id_user', response.action.payload.data.result.id_user.toString())
        AsyncStorage.setItem('role_id', response.action.payload.data.result.role_id.toString())
        AsyncStorage.setItem('card_number', response.action.payload.data.result.card_number.toString())
        AsyncStorage.setItem('fullname', response.action.payload.data.result.fullname.toString())
        // window.location.reload();
        console.warn(this.props.user)
        Alert.alert("okeoke")
        this.props.navigation.navigate("Home")
      })
      .catch(
        Alert.alert("password salah")
      )
  }


  componentDidMount = () => {

    if (this.props.token) {
      this.props.navigation.navigate('home')
    }

  }

  render() {
    console.warn(AsyncStorage.getItem('token'))
    return (
      <Container>

        <Content >
          <View style={{ marginTop: 30, marginBottom: 30, }}>
            <H1 style={{ marginLeft: 'auto', marginRight: 'auto', }}>Welcome</H1>
            <H2 style={styles.textGreyCenter}>Risano Library</H2>
          </View>
          <View>
            <Image style={styles.imagelogin} source={require('../../assets/images/library.png')}></Image>
          </View>
          <Form style={styles.containterFluid}>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input onChangeText={(email) => this.setState({ email })}
                value={this.state.email} />
            </Item>
            <PasswordInputText iconColor="#000" style={{ width: "95%", marginLeft: 12, }} label="Password" onChangeText={(password) => this.setState({ password })} value={this.state.password} />
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 20 }}>
              <Text style={{ marginLeft: 10 }}>Do you have an account yet?</Text>
              <TouchableOpacity onPress={() =>
                this.props.navigation.navigate('Register')}><Text style={{ color: 'blue' }}> Register Here</Text></TouchableOpacity>
            </View>
            <Button block style={{ marginTop: 20 }} onPress={() => this.handleLogin()}>
              <Text>Login</Text>
            </Button>
            <Button block warning style={{ marginTop: 10 }} onPress={() => this.props.navigation.navigate('Home')}>
              <Text>Cancel</Text>
            </Button>
          </Form>
        </Content>
      </Container >
    );
  }
}

const styles = StyleSheet.create({
  imagelogin: {
    width: 120,
    height: 120,
    marginLeft: "auto",
    marginRight: "auto"
  },
  textGreyCenter: {
    color: "grey",
    marginLeft: "auto",
    marginRight: "auto"
  },
  containterFluid: {
    width: "85%",
    marginLeft: "auto",
    marginRight: "auto"
  }

})
const mapStateToProps = state => {
  return {

    token: state.users.token,
    id_user: state.users.id_user,
    role_id: state.users.role_id,
    user: state.users.user
  }

}


export default connect(mapStateToProps)(Login);
