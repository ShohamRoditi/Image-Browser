import HomePage from './src/components/HomePage/HomePage'
import Favorites from './src/components/Favorites/Favorites'
import BigPic from './src/components/BigPic/BigPic'
import { createStackNavigator, createAppContainer } from 'react-navigation'

const MainNavigator = createStackNavigator(
  {
    HomePage: { screen: HomePage },
    Favorites: { screen: Favorites },
    BigPic: { screen: BigPic }
  },
  {
    initialRouteName: 'HomePage'
  }
)

const App = createAppContainer(MainNavigator)

export default App
