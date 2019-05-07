import { View, Image, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import BigPicActions from './BigPicActions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import styles from '../../../styles'
import AsyncStorage from '@react-native-community/async-storage'

const mapStateToProps = ({ BigPic }) => {
  return {
    BigImage: BigPic.bigImage,
    Like: BigPic.like
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      BigPicActions: bindActionCreators(BigPicActions, dispatch)
    }
  }
}

class BigPic extends Component {
  constructor(props) {
    super(props)
    this.handleAddToFavorites = this.handleAddToFavorites.bind(this)
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

  async componentDidMount() {
    const { changeLikeMode } = this.props.actions.BigPicActions
    const { BigImage } = this.props
    try {
      const allItemsInFavorites = await AsyncStorage.getAllKeys()
      changeLikeMode(false)
      allItemsInFavorites.forEach(key => {
        if (Number(key) === Number(BigImage.id)) {
          return changeLikeMode(true)
        }
      })
    } catch (err) {
      throw new Error(err)
    }
  }

  async handleAddToFavorites(image) {
    const { changeLikeMode } = this.props.actions.BigPicActions
    await AsyncStorage.setItem(`${image.id}`, JSON.stringify(image))
    await changeLikeMode(true)
  }

  render() {
    const { BigImage, Like } = this.props
    return (
      <View>
        <Image style={styles.bigImage} source={{ uri: BigImage.largeImageURL }} />
        {Like ? null : (
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => {
              this.handleAddToFavorites(BigImage)
            }}
          >
            <Image style={styles.favoriteIcon} source={require('../../images/likes.png')} />
          </TouchableOpacity>
        )}
      </View>
    )
  }
}

BigPic.propTypes = {
  BigImage: PropTypes.object,
  Like: PropTypes.bool,
  changeLikeMode: PropTypes.func,
  actions: PropTypes.objectOf(PropTypes.object)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BigPic)
