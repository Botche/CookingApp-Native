import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Text, View, Image } from 'react-native';
import { FlatList, ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';

import IconButton from '../../ui/iconButton';
import FormInput from '../../ui/formInput';
import FormButton from '../../ui/formButton';

import styles from './styles';
import constants from '../../../constants';

import firebaseContext from '../../../database/firebaseContext';

function CreateRecipe(props) {
    const [description, setDescription] = useState('');
    const [ingredientsArray, setIngredientsArray] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [photoUrlErrorMessage, setPhotoUrlErrorMessage] = useState('');
    const [time, setTime] = useState('');
    const [timeErrorMessage, setTimeErrorMessage] = useState('');
    const [title, setTitle] = useState('');
    const [titleErrorMessage, setTitleErrorMessage] = useState('');

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [categories, setCategories] = useState([]);

    useLayoutEffect(() => {
        props.navigation.setOptions({
            title: '',
            headerTransparent: "true",
            headerLeft: () => (
                <IconButton
                    onPress={() => {
                        props.navigation.goBack();
                    }}
                    icon={constants.icons.backArrow}
                />
            ),
            headerRight: () => <View />,
        });
    }, []);

    useEffect(() => {
        if (categories.length == 0) {
            getCategories();
        }
    }, [categories]);

    const createRecipe = () => {
        if (checkValidation() == false) {
            return;
        }

        try {
            const databaseRef = firebaseContext.getDatabaseReference('recipes');

            databaseRef.push()
                .set({
                    title: title,
                    categoryId: value,
                    photo_url: photoUrl,
                    ingredients: ingredientsArray,
                    time: time,
                    description: description,
                    author_id: props.userId,
                });

            props.navigation.navigate(constants.screens.recipes);
        } catch (error) {
            console.log(error.message)
        }
    };

    const checkValidation = () => {
        setTitleErrorMessage('');
        setPhotoUrlErrorMessage('');
        setIngredientsErrorMessage('');
        setTimeErrorMessage('');

        let isValid = true;
        if (title == '') {
            isValid = false;
            setTitleErrorMessage('Title is required!');
        }

        if (photoUrl == '') {
            isValid = false;
            setPhotoUrlErrorMessage('Photo url is required!');
        }

        if (photoUrl.startsWith('http') == false) {
            isValid = false;
            setPhotoUrlErrorMessage('Photo url must be valid!');
        }

        if (time == '') {
            isValid = false;
            setTimeErrorMessage('Time is required!');
        }

        let ingredientsByComma = ingredients
            .split(',')
            .map(ingredient => ingredient.trim());
        if (ingredientsByComma.length == 0) {
            isValid = false;
        } else {
            setIngredientsArray(ingredientsByComma);
        }

        return isValid;
    }

    const getCategories = () => {
        const databaseRef = firebaseContext.getDatabaseReference("categories");

        databaseRef.on('value', (data) => {
            const recipesCollection = [];
            const dataValue = data.val();
            for (const key in dataValue) {
                const element = {};
                element.value = key;
                element.label = dataValue[key].name;

                recipesCollection.push(element);
            }

            setCategories(recipesCollection);
        });
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <View><Text style={styles.header}>Create recipe</Text></View>

                <View style={styles.form}>
                    <FormInput
                        labelText="Title"
                        inputValue={title}
                        onChangeText={setTitle}
                        inputError={titleErrorMessage}
                    />

                    <View style={styles.categoryContainer}>
                        <Text>Category</Text>
                        <DropDownPicker
                            open={open}
                            value={value}
                            items={categories}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setCategories}
                            listMode="SCROLLVIEW"
                        />
                    </View>

                    <FormInput
                        labelText="Photo Url"
                        inputValue={photoUrl}
                        onChangeText={setPhotoUrl}
                        inputError={photoUrlErrorMessage}
                    />

                    <FormInput
                        labelText="Ingredients"
                        inputValue={ingredients}
                        onChangeText={setIngredients}
                        inputError="The ingredients should be separate by comma"
                    />

                    <FormInput
                        labelText="Cooking time"
                        inputValue={time}
                        onChangeText={setTime}
                        inputError={timeErrorMessage}
                    />

                    <FormInput
                        labelText="Description"
                        inputValue={description}
                        onChangeText={setDescription}
                    />

                    <FormButton
                        text="Create"
                        onPressFunc={createRecipe}
                    />
                </View>
            </View>
        </ScrollView>
    );
}

export default CreateRecipe;
