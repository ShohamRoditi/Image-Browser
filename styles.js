import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  favorite: {
    height: 40,
    width: 40,
    right: 12,
    top: 2
  },
  scroll: {
    height: '100%'
  },
  gridLayout: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 1000
  },
  listLayout: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    height: 2725
  },
  imageInfoContainer: {
    position: 'absolute',
    left: 140,
    top: 30
  },
  gridImages: {
    height: 120,
    width: 120,
    marginLeft: 12,
    marginTop: 5
  },
  listImages: {
    height: 120,
    width: 120,
    marginLeft: 10,
    marginBottom: 10
  },
  imageInfo: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'flex-start'
  },
  imageTag: {
    fontWeight: 'bold',
    fontSize: 16
  },
  notFound: {
    top: 80,
    height: 350,
    width: '100%',
    alignSelf: 'center'
  },
  loading: {
    height: 400,
    width: 400,
    alignSelf: 'center'
  },
  imageLikes: {
    left: 15
  },
  bigImage: {
    height: 400,
    width: 400,
    alignSelf: 'center',
    resizeMode: 'contain'
  },
  favoriteButton: {
    height: 100,
    width: 100,
    alignSelf: 'center'
  },
  favoriteIcon: {
    height: 100,
    width: 100,
    alignSelf: 'center'
  }
})

export default styles
