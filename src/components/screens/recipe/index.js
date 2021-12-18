import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Text, View, Image } from 'react-native';
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';

import BackButton from "../../ui/backButton";

import firebaseContext from '../../../database/firebaseContext';

import constants from '../../../constants';
import styles from './styles';

function Recipe(props) {
    const item = props.route.params?.item;
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (categories.length == 0) {
            getCategories();
        }
    }, [categories]);

    useLayoutEffect(() => {
        props.navigation.setOptions({
            title: '',
            headerTransparent: "true",
            headerLeft: () => (
                <BackButton
                    onPress={() => {
                        props.navigation.goBack();
                    }}
                />
            ),
            headerRight: () => <View />,
        });
    }, []);

    const getCategories = () => {
        const databaseRef = firebaseContext.getDatabaseReference("categories");

        databaseRef.on('value', (data) => {
            const recipesCollection = [];
            const dataValue = data.val();
            for (const key in dataValue) {
                const element = dataValue[key];
                element.id = key;

                recipesCollection.push(element);
            }

            setCategories(recipesCollection);
        });
    }

    const getCategoryName = (categoryId) => {
        for (const category of categories) {
            if (category.id == categoryId) {
                return category.name;
            }
        }
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.infoRecipeContainer}>
                <Text style={styles.infoRecipeName}>{item.title}</Text>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{ uri: item.photo_url }} />
                </View>
                <View style={styles.infoContainer}>
                    <TouchableHighlight onPress={() => navigation.navigate("RecipesList", { category, title })}>
                        <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text>
                    </TouchableHighlight>
                </View>

                <View style={styles.infoContainer}>
                    <Image style={styles.infoPhoto} source={constants.icons.time} />
                    <Text style={styles.infoRecipe}>{item.time} minutes </Text>
                </View>

                <View style={styles.ingredientsContainer}>
                    <Text style={styles.ingredientsHeader}>Ingredients list:</Text>
                    {Object.keys(item.ingredients).map((ingredientId) => (
                        <View key={ingredientId}>
                            <Text style={styles.ingredientsName}>- {item.ingredients[ingredientId].name}</Text>
                        </View>
                    )
                    )}
                </View>
                <View style={styles.infoContainer}>
                    <Text>Description:</Text>
                    <Text style={styles.infoDescriptionRecipe}>{item.description}</Text>
                </View>
            </View>
        </ScrollView>
    );
}

export default Recipe;
