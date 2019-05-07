import React, { Component } from 'react'
import { View, TouchableOpacity, Image, Text } from 'react-native'
import styles from '../../../styles'
import { SearchBar, ButtonGroup } from 'react-native-elements'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import HomePageActions from './HomePageActions'
import { ScrollView } from 'react-native-gesture-handler'
import BigPicActions from '../BigPic/BigPicActions'

const mapStateToProps = ({ HomePage, BigPic }) => {
  return {
    images: HomePage.images,
    loading: HomePage.loading,
    displayView: HomePage.displayView,
    bigImage: BigPic.bigImage
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      BigPicActions: bindActionCreators(BigPicActions, dispatch),
      HomePageActions: bindActionCreators(HomePageActions, dispatch)
    }
  }
}

class HomePage extends Component {
  constructor(props) {
    super(props)
    this.gridDisplayImages = this.gridDisplayImages.bind(this)
    this.handleBigPic = this.handleBigPic.bind(this)
    this.listDisplayImages = this.listDisplayImages.bind(this)
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Image Browser',
    headerStyle: {
      backgroundColor: '#323D4D'
    },
    headerTitleStyle: {
      fontSize: 25,
      left: 100,
      color: '#ffffff'
    },
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
        <Image source={require('../../images/favorites.png')} style={styles.favorite} />
      </TouchableOpacity>
    )
  })

  state = {
    searchInput: ''
  }

  componentDidMount() {
    this.handleSearchImages()
  }

  async handleBigPic(image) {
    const { navigate } = this.props.navigation
    const { showBigPic } = this.props.actions.BigPicActions
    await showBigPic(image)
    navigate('BigPic')
  }

  async handleSearchImages() {
    const { handleImages, handleLoading } = this.props.actions.HomePageActions

    handleLoading(true)
    await handleImages(this.state.searchInput)
    handleLoading(false)
  }

  gridDisplayImages(image) {
    return (
      <TouchableOpacity
        key={image.id}
        onPress={() => {
          this.handleBigPic(image)
        }}
      >
        <Image style={styles.gridImages} source={{ uri: image.previewURL }} />
      </TouchableOpacity>
    )
  }

  listDisplayImages(image) {
    const tags = image.tags.split(',')
    return (
      <TouchableOpacity
        key={image.id}
        onPress={() => {
          this.handleBigPic(image)
        }}
      >
        <Image style={styles.listImages} source={{ uri: image.previewURL }} />
        <View style={styles.imageInfoContainer}>
          <Text style={styles.imageTag}>
            {tags[0]}, {tags[1]}
          </Text>
          <View style={styles.imageInfo}>
            <Text style={styles.imageViews}>Views: {image.views}</Text>
            <Text style={styles.imageLikes}>Likes: {image.likes}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  renderImages() {
    const searchInput = this.state.searchInput
    const { images } = this.props
    const { displayView } = this.props
    const { handleDisplayView } = this.props.actions.HomePageActions
    const buttons = ['Grid', 'List']
    return (
      <View>
        <SearchBar
          placeholder="Search"
          onChangeText={searchText => this.setState({ searchInput: searchText })}
          value={searchInput}
          onSubmitEditing={() => this.handleSearchImages()}
        />
        <ButtonGroup
          buttons={buttons}
          onPress={viewMode => (viewMode ? handleDisplayView(true) : handleDisplayView(false))}
        />
        {images.data.length > 0 ? (
          <ScrollView style={styles.scroll}>
            {displayView ? (
              <View style={styles.listLayout}>{images.data.map(this.listDisplayImages)}</View>
            ) : (
              <View style={styles.gridLayout}>{images.data.map(this.gridDisplayImages)}</View>
            )}
          </ScrollView>
        ) : (
          <Image style={styles.notFound} source={require('../../images/notFound.gif')} />
        )}
      </View>
    )
  }

  renderLoading() {
    const searchInput = this.state.searchInput
    const { handleDisplayView } = this.props.actions.HomePageActions
    const buttons = ['Grid', 'List']
    return (
      <View>
        <SearchBar
          placeholder="Search"
          onChangeText={searchText => this.setState({ searchInput: searchText })}
          value={searchInput}
          onSubmitEditing={() => this.handleSearchImages()}
        />
        <ButtonGroup
          buttons={buttons}
          onPress={viewMode => (viewMode ? handleDisplayView(true) : handleDisplayView(false))}
        />
        <Image style={styles.loading} source={require('../../images/load.gif')} />
      </View>
    )
  }

  render() {
    const { loading } = this.props

    return loading ? this.renderLoading() : this.renderImages()
  }
}

HomePage.propTypes = {
  navigation: PropTypes.object,
  showBigPic: PropTypes.func,
  handleDisplayView: PropTypes.func,
  displayView: PropTypes.bool,
  loading: PropTypes.bool,
  images: PropTypes.object,
  handleImages: PropTypes.func,
  actions: PropTypes.objectOf(PropTypes.object)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage)
