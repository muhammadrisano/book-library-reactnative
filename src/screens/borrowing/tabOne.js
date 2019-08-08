import React, { Component } from 'react';
import { AsyncStorage, Image, FlatList, ActivityIndicator } from 'react-native';
import { Content, List, Left, Thumbnail, ListItem, Text, View, Body, Right, Button, Card, CardItem, } from 'native-base'
import { connect } from 'react-redux'
import { borrowBookUser } from '../../redux/actions/loanbooks'
import { isMetaProperty } from '@babel/types';
import Modal from "react-native-modal";
import { Overlay } from 'react-native-elements';
class tabOne extends Component {
    constructor(props) {
        super(props);
        this.state = {
            card_number: "",
            fullname: "",
            id_user: "",
            role_id: "",
            token: "",
            isloading: true,
            isModalVisible: false,
            dataShow: "",
            isVisible: false,
            loading: true,
            data: "",
            error: false,
            refreshing: false,
            page: 1,
        };

        AsyncStorage.getItem('card_number', (error, result) => {
            if (result) {
                this.setState({
                    card_number: result,
                    isloading: false
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
    toggleModal = (data) => {

        this.setState({
            dataShow: data
        })
        this.setState({ isVisible: !this.state.isVisible });
        console.warn(this.state.dataShow)
    };

    handleReflesh = () => {
        this.setState(
            {
                page: 1,
                refreshing: true,
                seed: this.state.seed + 1
            },
            () => {
                this.getBorrow();
            }
        )
    }

    handleLoadMore = () => {
        this.setState(
            {
                loading: true,
                page: this.state.page + 1
            },
            () => {
                this.getdataBook();
            }
        )
    }
    getBorrow = () => {
        this.setState({ loading: true })
        setTimeout(async () => {
            await this.props.dispatch(borrowBookUser(this.state.card_number, {
                "authorization": "jangan-coba-coba",
                "x-access-token": "bearer " + this.state.token,
                "x-control-user": this.state.id_user
            }))
                .then(res => {
                    this.setState({
                        data: this.state.page === 1 ? res.action.payload.data.result : [...this.state.data, ...res.action.payload.data.result],
                        error: res.error || null,
                        loading: false,
                        refreshing: false
                    });
                })
            console.warn(this.state.data)
        }, 3000)


    }
    renderFooter = () => {
        // if (!this.state.loading) return null;

        return (
            <View>
                <ActivityIndicator size="large" color="#0000ff" width={10} />
            </View>
        )
    }


    componentDidMount = () => {

        this.getBorrow()

    }


    render() {
        console.log(this.props.borrowUser)
        return (
            <View>
                <List>
                    {(this.state.loading) ? <View>
                        <ActivityIndicator size="large" color="#0000ff" width={10} />
                    </View> : <View></View>}
                    <FlatList
                        data={this.state.data}
                        renderItem={({ item }) => {
                            if (item.information !== "SELESAI") return (

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
                                        <Button transparent onPress={() => this.toggleModal(item)}>
                                            <Text>View</Text>
                                        </Button>
                                    </Right>
                                </ListItem>

                            )
                        }}
                        // onEndReached={this.handleLoadMore}
                        onEndThreshold={500}
                    // ListFooterComponent={this.renderFooter}
                    // refreshing={this.state.refreshing}
                    // onRefresh={this.handleReflesh}
                    />



                </List>


                <Overlay
                    isVisible={this.state.isVisible}
                    windowBackgroundColor="rgba(0, 0, 0, 0.5)"
                    overlayBackgroundColor="none"
                    width={300}
                    height="auto"
                >
                    <Card style={{ marginTop: -9, marginRight: -9, marginLeft: -9, marginBottom: -9 }}>
                        <CardItem header bordered>
                            <Text>Detail Borrow</Text>
                        </CardItem>
                        <CardItem bordered>
                            <Body>
                                <View style={{ alignItems: 'center', width: "100%", marginBottom: 5, }}>
                                    <Image source={{ uri: this.state.dataShow.image }}
                                        style={{ width: 200, height: 200 }} />
                                </View>

                            </Body>
                        </CardItem>
                        <CardItem footer bordered>
                            <Text>Title : {this.state.dataShow.title}</Text>
                        </CardItem>
                        <CardItem footer bordered>
                            <Text>Writer : {this.state.dataShow.writer}</Text>
                        </CardItem>
                        <CardItem footer bordered>
                            <Text>Expired date : {this.state.dataShow.expired_date}</Text>
                        </CardItem>
                        <CardItem footer bordered>
                            <Text>Status : {this.state.dataShow.information}</Text>
                        </CardItem>
                        <CardItem footer bordered>
                            <Button warning onPress={this.toggleModal} style={{ width: "45%", marginLeft: 10, textAlign: "center" }}><Text style={{ textAlign: "center" }}> Cancel </Text></Button>
                        </CardItem>

                    </Card>


                </Overlay>
                {/* modal donate */}


                {/* end modal donate */}


            </View >
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

export default connect(mapStateToProps)(tabOne);
