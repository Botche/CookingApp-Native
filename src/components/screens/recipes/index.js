import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Text, View, Image } from 'react-native';
import { FlatList, TouchableHighlight } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';

import IconButton from '../../ui/iconButton';

import styles from './styles';
import constants from '../../../constants';

import firebaseContext from '../../../database/firebaseContext';

function Recipes(props) {
    const [recipes, setRecipes] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (recipes.length == 0) {
            getRecipes();
            getCategories();
        }
    }, [recipes]);

    useLayoutEffect(() => {
        props.navigation.setOptions({
            title: '',
            headerTransparent: "true",
            headerLeft: () => (
                <IconButton
                    onPress={() => {
                        auth().signOut();
                        props.setUserId('');
                    }}
                    icon={constants.icons.logount}
                />
            ),
            headerRight: () => (
                <IconButton
                    onPress={() => {
                        props.navigation.navigate(constants.screens.createRepice);
                    }}
                    icon={constants.icons.createIcon}
                />
            )
        }, []);
    });

    const getRecipes = () => {
        const databaseRef = firebaseContext.getDatabaseReference("recipes");

        databaseRef.on('value', (data) => {
            const recipesCollection = [];
            const dataValue = data.val();
            for (const key in dataValue) {
                const element = dataValue[key];
                element.id = key;

                recipesCollection.push(element);
            }

            setRecipes(recipesCollection);
        });
    };

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

    const onPressRecipe = (item) => {
        props.navigation.navigate(constants.screens.recipe, { item });
    };

    const renderRecipes = ({ item }) => (
        <TouchableHighlight underlayColor="transparent" onPress={() => onPressRecipe(item)}>
            <View style={styles.container}>
                <Image style={styles.photo} source={{ uri: item.photo_url }} />
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text>
            </View>
        </TouchableHighlight>
    );

    return (
        <View>
            <Text style={styles.header}>Recipes</Text>

            <FlatList
                vertical
                showsVerticalScrollIndicator={false}
                numColumns={2}
                data={recipes}
                renderItem={renderRecipes}
                keyExtractor={(item) => `${item.id}`}
            />
        </View>
    );
}

export default Recipes;
