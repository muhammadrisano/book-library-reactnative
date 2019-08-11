import { createDrawerNavigator, createStackNavigator, createAppContainer, DrawerItems, SafeAreaView } from 'react-navigation'


import Home from '../../screens/home/Home'
import Profile from '../../screens/profile/Profile'
import Register from '../../screens/register/Register'
import Login from '../../screens/login/Login'
import Detailbook from '../../screens/detailbook/Detailbook'
import Borrowing from '../../screens/borrowing/Borrowing'
import CustomsDrawer from '../../components/CustomsDrawer'
import Logout from '../../components/Logout';
import { View, Text, StyleSheet, Image } from 'react-native'
import { Container, Content, Header, Body, Icon } from 'native-base'





const AppNavigator = createStackNavigator({
  Home,
  Profile,
  Register,
  Login,
  Detailbook,
  Borrowing,
  Logout
}, {
    initialRouteName: 'Home',
    headerMode: 'none',

  })

const DrawerNavigator = createDrawerNavigator(
  {
    Menu: {
      screen: AppNavigator,

    },
    Home,
    Login,
    Borrowing
  },
  {

    // drawerPosition: 'left',
    // // contentComponent: CustomDrawerContentComponent,
    // drawerOpenRoute: 'DrawerOpen',
    // drawerCloseRoute: 'DrawerClose',
    // drawerToggleRoute: 'DrawerToggle',
    contentComponent: CustomsDrawer,
    // navigationOptions: {
    //   drawerLockMode: 'locked-closed',
    // },
  }
);
// const DrawerContent = (props) => (<ScrollView>
//   <DrawerItems {...props} />
//   <Text>Your Own Footer Area After</Text>
// </ScrollView>)

// const CustomDrawerContentComponent = props => (
//   <ScrollView>
//     <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
//       <DrawerItems {...props} />
//     </SafeAreaView>
//   </ScrollView>
// );
// const tetetes = props => (
//   <View style={styles.container}>
//     <ScrollView>
//       <View>
//         <Text style={styles.sectionHeadingStyle}>
//           Section 1
//             </Text>
//         <View style={styles.navSectionStyle}>
//           <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Page1')}>
//             Page1
//               </Text>
//         </View>
//       </View>
//       <View>
//         <Text style={styles.sectionHeadingStyle}>
//           Section 2
//             </Text>
//         <View style={styles.navSectionStyle}>
//           <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Page2')}>
//             Page2
//               </Text>
//           <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Page3')}>
//             Page3
//               </Text>
//         </View>
//       </View>
//     </ScrollView>
//     <View style={styles.footerContainer}>
//       <Text>This is my fixed footer</Text>
//     </View>
//   </View>
// )


// SideMenu.propTypes = {
//   navigation: PropTypes.object
// };




// const AppDrawer = createAppContainer(DrawerNavigator)
export default createAppContainer(DrawerNavigator)