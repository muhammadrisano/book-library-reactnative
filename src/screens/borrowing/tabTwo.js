import React, { Component } from 'react';
import { AsyncStorage, ActivityIndicator } from 'react-native';
import { Content, List, Left, Thumbnail, ListItem, Text, View, Body, Right, Button, } from 'native-base'
import { connect } from 'react-redux'
import { borrowBookUser } from '../../redux/actions/loanbooks'
import { isMetaProperty } from '@babel/types';
import moment from 'moment'
class tabTwo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            card_number: "",
            fullname: "",
            id_user: "",
            role_id: "",
            token: "",
            loading: true
        };

        AsyncStorage.getItem('card_number', (error, result) => {
            if (result) {
                this.setState({
                    card_number: result,

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
                    token: result,

                });
            }
        });
    }
    componentDidMount = async () => {

        setTimeout(async () => {
            await this.props.dispatch(borrowBookUser(this.state.card_number, {
                "authorization": "jangan-coba-coba",
                "x-access-token": "bearer " + this.state.token,
                "x-control-user": this.state.id_user
            }))
                .then((response) => {
                    this.setState({ loading: false })
                })
        }, 1000)
        // setTimeout(async () => {
        // await this.props.dispatch(borrowBookUser(123123, {
        //     "authorization": "jangan-coba-coba",
        //     "x-access-token": "bearer " + this.state.token,
        //     "x-control-user": this.state.id_user
        // }))
        //     console.log(this.props.borrowUser)
        // }, 1000)




        // .then((response) => {
        //     // console.warn(response)
        // })

    }


    render() {
        console.log(this.props.borrowUser)
        return (
            <View>
                {(this.state.loading) ? <View>
                    <ActivityIndicator size="large" color="#0000ff" width={10} />
                </View> : <View></View>}
                <List>
                    {this.props.borrowUser.map((item) => {
                        if (item.information === "SELESAI") {
                            return (
                                <ListItem thumbnail>
                                    <Left>
                                        <Thumbnail square source={{ uri: item.image }} />
                                    </Left>
                                    <Body>
                                        <Text>{item.title}</Text>
                                        <Text note numberOfLines={1}>Penulis : {item.writer}</Text>
                                        <Text note numberOfLines={2}>status : {item.information}</Text>
                                    </Body>
                                    <Right>
                                        {/* <Button transparent>
                                            <Text>View</Text>
                                        </Button> */}
                                        <Text note>Return</Text>
                                        <Text note>
                                            {moment(item.updated_at).format('LL')}
                                            {/* {item.updated_at} */}
                                        </Text>
                                    </Right>
                                </ListItem>
                            )
                        }

                    })}
                </List>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {

        borrowUser: state.loanbooks.borrowUser,
        bookshow: state.books.bookshow,
        token: state.users.token,
        id_user: state.users.id_user,
        role_id: state.users.role_id,
        card_number: state.users.card_number
    }
}

export default connect(mapStateToProps)(tabTwo);
