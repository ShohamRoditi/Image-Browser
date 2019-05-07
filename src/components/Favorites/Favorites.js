import { View, Image, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import FavoritesActions from './FavoritesActions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import styles from '../../../styles'
import AsyncStorage from '@react-native-community/async-storage'
import BigPicActions from '../BigPic/BigPicActions'
import BigPic from '../BigPic/BigPic'
import HomePageActions from '../HomePage/HomePageActions'
import HomePage from '../HomePage/HomePage'
import { ScrollView } from 'react-native-gesture-handler'

const mapStateToProps = ({ Favorites, HomePage }) => {
  return {
    favImages: Favorites.favList,
    loading: HomePage.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      FavoritesActions: bindActionCreators(FavoritesActions, dispatch),
      BigPicActions: bindActionCreators(BigPicActions, dispatch),
      HomePageActions: bindActionCreators(HomePageActions, dispatch)
    }
  }
}

class Favorites extends Component {
  constructor(props) {
    super(props)
    this.getFavList = this.getFavList.bind(this)
    this.displayFavImages = this.displayFavImages.bind(this)
    this.handleBigPic = this.handleBigPic.bind(this)
    this.renderFav = this.renderFav.bind(this)
  }

  static navigationOptions = () => ({
    title: 'Image Browser',
    headerStyle: {
      backgroundColor: '#323D4D'
    },
    headerTitleStyle: {
      fontSize: 25,
      left: 45,
      color: '#ffffff'
    }
  })

  async handleBigPic(image) {
    const { navigate } = this.props.navigation
    const { showBigPic } = this.props.actions.BigPicActions
    await showBigPic(image)
    navigate('BigPic')
  }

  async componentDidMount() {
    const { handleLoading } = this.props.actions.HomePageActions
    await handleLoading(true)
    await this.getFavList()
    await handleLoading(false)
  }

  displayFavImages(imageInfo) {
    const img = JSON.parse(imageInfo)
    return (
      <TouchableOpacity
        key={img.id}
        onPress={() => {
          this.handleBigPic(img)
        }}
      >
        <Image style={styles.gridImages} source={{ uri: img.previewURL }} />
      </TouchableOpacity>
    )
  }

  async getFavList() {
    const { updateFavList } = this.props.actions.FavoritesActions
    const { handleLoading } = this.props.actions.HomePageActions
    const favImages = []
    try {
      const allKeys = await AsyncStorage.getAllKeys()
      const allImages = await AsyncStorage.multiGet(allKeys)
      await allImages.forEach(async favImg => {
        await favImages.push(favImg[1])
      })
      await updateFavList(favImages)
      handleLoading(true)
    } catch (err) {
      throw new Error(err)
    }
  }

  renderFav() {
    const { favImages } = this.props
    return (
      <View>
        {favImages.images && (
          <View>
            <ScrollView style={styles.scroll}>
              <View style={styles.gridLayout}>{favImages.images.map(this.displayFavImages)}</View>
            </ScrollView>
          </View>
        )}
      </View>
    )
  }

  renderLoading() {
    return (
      <View>
        <Image style={styles.loading} source={require('../../images/load.gif')} />
      </View>
    )
  }

  render() {
    const { loading } = this.props
    return loading ? this.renderLoading() : this.renderFav()
  }
}

Favorites.propTypes = {
  loading: PropTypes.bool,
  handleLoading: PropTypes.func,
  updateFavList: PropTypes.func,
  favImages: PropTypes.object,
  showBigPic: PropTypes.func,
  navigate: PropTypes.func,
  navigation: PropTypes.object,
  actions: PropTypes.objectOf(PropTypes.object)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favorites, BigPic, HomePage)
