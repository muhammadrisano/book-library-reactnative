import React, { Component } from 'react';
import { ActivityIndicator, Alert, TouchableOpacity, AsyncStorage, TouchableHighlight, Image, FlatList, StyleSheet } from 'react-native'
import { H2, Container, Label, Header, Title, Button, Icon, CardItem, Text, Left, Right, Card, View, Body, Content, Form, Item, Picker, Input, Spinner } from "native-base";
import { ScrollView } from 'react-native-gesture-handler';
import Modal from "react-native-modal";
import { connect } from 'react-redux'
import { getBooks } from '../../redux/actions/books'
import { inputBook } from '../../redux/actions/books'
import ImagePicker from 'react-native-image-picker'
import { SearchBar } from 'react-native-elements';
import { Overlay } from 'react-native-elements';
// import AsyncStorage from '@react-native-community/async-storage';
class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      counter: 0,
      isVisible: false,
      name: "",
      image: "",
      writer: "",
      description: "",
      location: "",
      id_category: "",
      status: "",
      photo: null,
      loading: true,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
      jumlahpage: null
    }
  }

  toggleModal = () => {
    this.setState({ isVisible: !this.state.isVisible });
  };

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    }
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({ photo: response })
      }
    })
  }
  handlerChangeName = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  prosesInput = async () => {
    const dataFile = new FormData()

    dataFile.append('image',
      {
        uri: this.state.photo.uri,
        type: 'image/jpeg',
        name: 'terserahdah'
      }
    ),
      dataFile.append('name', this.state.name)
    dataFile.append('writer', this.state.location)
    dataFile.append('location', this.state.writer)
    dataFile.append('description', this.state.description)
    dataFile.append('id_category', this.state.id_category)


    await this.props.dispatch(inputBook(dataFile))
      .then((response) => {

        this.setState({
          name: "",
          image: "",
          writer: "",
          description: "",
          location: "",
          id_category: "",
          page: 1,
        })

        this.toggleModal()
        Alert.alert("donate berhasil")
        this.handleReflesh()

      })

  }
  handlerChangeWriter = (e) => {
    this.setState({
      writer: e.target.value
    })
  }

  handlerChangeDescription = (e) => {
    this.setState({
      description: e.target.value
    })
  }

  handlerChangeLocation = (e) => {
    this.setState({
      location: e.target.value
    })
  }

  handlerChangeIdcategory = (e) => {
    this.setState({
      id_category: e.target.value
    })
  }
  _alert(string) {
    Alert.alert(string)

  }
  question = () => {
    Alert.alert(
      'do you want to donate books?',
      '',
      [{},
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => this.toggleModal() },
      ],
      { cancelable: false },
    );
  }

  getdataBook = () => {
    this.setState({ loading: true })
    setTimeout(async () => {

      await this.props.dispatch(getBooks(this.state.page))
        .then(res => {
          this.setState({
            data: this.state.page === 1 ? res.action.payload.data.result : [...this.state.data, ...res.action.payload.data.result],
            error: res.error || null,
            loading: false,
            refreshing: false,
            jumlahpage: Math.ceil(parseInt(res.action.payload.data.jumlah) / 12)
          });
          if (this.state.page > this.state.jumlahpage) {
            this.setState({
              loading: false,
              error: true
            })
            Alert.alert("sorry the page is up ")

          }
        })
        .catch(error => {
          this.setState({ errr, loading: false, refreshing: false })
        })
    }, 3000)

  }
  componentDidMount = () => {
    this.getdataBook()

  }


  chooseFile = () => {
    var options = {
      title: 'Pilih Photo !',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {

      if (response.didCancel) {

        alert('User cancelled image picker');
      } else if (response.error) {
        alert('ImagePicker Error: ' + response.error);
      } else {
        let source = response;
        this.setState({
          photo: source,
        });
      }
    });
  };

  handleReflesh = () => {
    this.setState(
      {
        page: 1,
        refreshing: true,
        seed: this.state.seed + 1
      },
      () => {
        this.getdataBook();
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

  renderHeader = () => {
    return (
      <Item rounded style={{ marginBottom: 20 }}>
        <Input placeholder='Search Book' />
      </Item>
    )
  }

  renderFooter = () => {
    // if (!this.state.loading) return null;

    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" width={10} />
      </View>
    )
  }

  // }

  render() {

    return (
      <Container>

        <Header noShadow style={{ backgroundColor: "#BC8F8F" }}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Library Book</Title>
          </Body>
          <Right>
            <Button transparent onPress={this.question}>
              <Icon name='add' />
            </Button>
          </Right>
        </Header>
        {/* <ScrollView> */}
        <View style={{ marginTop: 20, width: '90%', marginRight: 'auto', marginLeft: 'auto' }}>


        </View>


        {/* card bokok */}



        <FlatList

          numColumns={2}
          data={this.state.data}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (

            <Card style={{
              width: 150, marginLeft: 12, marginBottom: 20, shadowColor: "#000", backgroundColor: "rgb(224, 217, 220)",
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.29,
              shadowRadius: 4.65,

              elevation: 7, borderRadius: 10
            }} key={item.id_book}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Detailbook', {
                bookdetail: item
              })}>
                <CardItem cardBody style={{ borderRadius: 10 }}>
                  <Image source={{ uri: item.image }} style={{ height: 150, width: null, flex: 1, borderRadius: 10 }} />
                </CardItem>
              </TouchableOpacity>
              <CardItem style={{ borderRadius: 10, backgroundColor: "rgb(224, 217, 220)" }}>
                <Left>

                  <Text>{item.name}</Text>

                </Left>
              </CardItem>
            </Card>

          )}
          onEndReached={this.handleLoadMore}
          onEndThreshold={140}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          refreshing={this.state.refreshing}
          onRefresh={this.handleReflesh}
        // ItemSeparatorComponent={this.renderSeparator}
        // listHeaderComponent={this.renderSeparator}
        />










        {/* </ScrollView> */}
        {/* modal donate */}
        <Overlay
          isVisible={this.state.isVisible}
          windowBackgroundColor="rgba(0, 0, 0, .5)"
          overlayBackgroundColor="white"
          width={320}
          height={530}
        >


          <H2 style={{ marginTop: 10, marginBottom: 10, marginLeft: 'auto', marginRight: 'auto' }}>Donate Book </H2>
          <Form>
            <Item floatingLabel>
              <Label>Title Book</Label>
              <Input onChangeText={(name) => this.setState({ name })}
                value={this.state.name} />
            </Item>


            <Button info onPress={this.chooseFile.bind(this)} transparent><Text style={{ fontSize: 16, marginTop: 22 }}>Upload Image </Text></Button>
            {/* <Button title="Choose Photo" onPress={this.handleChoosePhoto} /> */}

            <Item floatingLabel style={{ marginTop: 0 }}>
              <Label>Writer</Label>
              <Input onChangeText={(writer) => this.setState({ writer })}
                value={this.state.writer} />
            </Item>

            <Item floatingLabel>
              <Label>Description</Label>
              <Input onChangeText={(description) => this.setState({ description })}
                value={this.state.description} />
            </Item>

            <Item floatingLabel>
              <Label>Location</Label>
              <Input onChangeText={(location) => this.setState({ location })}
                value={this.state.location} />
            </Item>

            <Item floatingLabel>
              <Label>Categori</Label>
              <Input onChangeText={(id_category) => this.setState({ id_category })}
                value={this.state.id_category} />
            </Item>
            <View style={{
              marginTop: 40, flex: 1,
              flexDirection: 'row',
              alignItems: 'center'
            }}>
              <Button warning onPress={this.toggleModal} style={{ width: "45%", marginLeft: 10, textAlign: "center", textAlign: "center" }}><Text style={{ textAlign: "center" }}> Cancel </Text></Button>
              <Button primary style={{ width: "45%", marginLeft: 10, }} onPress={this.prosesInput}><Text> Donate </Text></Button>
            </View>
          </Form>
          {/* <Button block warning onPress={this.toggleModal} style={{marginTop:10}}>
            <Text>Cancel</Text>
          </Button> */}


        </Overlay>

        {/* end modal donate */}

      </Container >

    )
  }

}

const styles = StyleSheet.create({
  list: {
    justifyContent: 'center',
    flexDirection: 'column',
    marginLeft: 10
    // flexWrap: 'wrap',
  }
});

const mapStateToProps = state => {
  return {

    jumlahbuku: state.books.jumlahbuku,
    bookshow: state.books.bookshow,
    token: state.users.token,
    id_user: state.users.id_user,
    role_id: state.users.role_id
  }

}

export default connect(mapStateToProps)(Home);
