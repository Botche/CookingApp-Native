import { StyleSheet, Dimensions } from 'react-native';

const { width: viewportWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: 250
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    width: viewportWidth,
    height: 250
  },
  infoRecipeContainer: {
    flex: 1,
    margin: 25,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  ingredientsContainer: {
    marginTop: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  ingredientsHeader: {
    fontSize: 20,
  },
  ingredientsName: {
    fontSize: 18,
  },
  infoPhoto: {
    height: 20,
    width: 20,
    marginRight: 0
  },
  infoRecipe: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  category: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    color: '#2cd18a'
  },
  infoDescriptionRecipe: {
    fontSize: 16,
    marginTop: 30,
    margin: 15,
    width: '80%',
  },
  infoRecipeName: {
    fontSize: 28,
    margin: 10,
    marginTop: 0,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center'
  },
});

export default styles;
