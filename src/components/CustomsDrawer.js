import React, { Component } from 'react';
import { createDrawerNavigator, createStackNavigator, createAppContainer, DrawerItems, SafeAreaView } from 'react-navigation'
import { View, Text, StyleSheet, Image, TouchableOpacity, AsyncStorage } from 'react-native'
import { Container, Content, Header, Body, Icon, List, ListItem, Left, Right } from 'native-base'
class CustomsDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            card_number: null,
            fullname: null,
            id_user: null,
            role_id: null,
            token: null
        };


        AsyncStorage.getItem('card_number', (error, result) => {
            if (result) {
                this.setState({
                    card_number: result
                });
            }
        });
        AsyncStorage.getItem('fullname', (error, result) => {
            if (result) {
                this.setState({
                    fullname: result
                });
            }
        });
        AsyncStorage.getItem('id_user', (error, result) => {
            if (result) {
                this.setState({
                    id_user: result
                });
            }
        });
        AsyncStorage.getItem('role_id', (error, result) => {
            if (result) {
                this.setState({
                    role_id: result
                });
            }
        });
        AsyncStorage.getItem('token', (error, result) => {
            if (result) {
                this.setState({
                    token: result
                });
            }
        });
    }



    render() {
        return (
            <Container>
                <Header style={{ height: 200, alignItems: 'center', backgroundColor: "#BC8F8F" }}>
                    <Body>
                        <Image
                            style={styles.drewerImage}
                            source={require('../assets/images/profile.png')}></Image>
                    </Body>
                </Header>
                <Content>
                    <List>


                        <ListItem onPress={() => this.props.navigation.navigate('Home')} noIndent style={{ backgroundColor: "#cde1f9" }}>

                            <Left>

                                <Text>Home Page</Text>

                            </Left>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>

                        </ListItem>

                        <View>
                            <ListItem onPress={() => this.props.navigation.navigate('Login')}>
                                <Left>
                                    <Text>Login</Text>
                                </Left>
                                <Right>
                                    <Icon name="arrow-forward" />
                                </Right>
                            </ListItem>

                            <ListItem onPress={() => this.props.navigation.navigate('Register')} >
                                <Left>
                                    <Text>Register</Text>
                                </Left>
                                <Right>
                                    <Icon name="arrow-forward" />
                                </Right>
                            </ListItem>
                        </View>
                        <View>

                            <ListItem onPress={() => this.props.navigation.navigate('Borrowing')} >
                                <Left>
                                    <Text>Borrowing</Text>
                                </Left>
                                <Right>
                                    <Icon name="arrow-forward" />
                                </Right>
                            </ListItem>
                            <ListItem onPress={() => this.props.navigation.navigate('Logout')} >
                                <Left>
                                    <Text>Logout</Text>
                                </Left>
                                <Right>
                                    <Icon name="arrow-forward" />
                                </Right>
                            </ListItem>
                        </View>

                    </List>
                </Content>
            </Container >
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    drewerImage: {
        height: 150,
        width: 150,
        borderRadius: 75,
        marginLeft: "auto",
        marginRight: "auto",
    }
})
export default CustomsDrawer;





