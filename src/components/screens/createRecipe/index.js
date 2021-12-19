import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
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

    const [openCategoryDropdown, setOpenCategoryDropdown] = useState(false);
    const [categoryValue, setCategoryValue] = useState(null);
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
                    categoryId: categoryValue,
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
        setTimeErrorMessage('');

        let isValid = true;
        if (title === '') {
            isValid = false;
            setTitleErrorMessage(constants.exceptionMessages.titleRequired);
        }

        if (photoUrl === '') {
            isValid = false;
            setPhotoUrlErrorMessage(constants.exceptionMessages.photoUrlRequired);
        }

        if (photoUrl.startsWith('http') == false) {
            isValid = false;
            setPhotoUrlErrorMessage(constants.exceptionMessages.photoUrlInvalid);
        }

        if (time === '') {
            isValid = false;
            setTimeErrorMessage(constants.exceptionMessages.timeRequired);
        }

        if (categoryValue === null) {
            isValid = false;
        }

        let ingredientsByComma = ingredients
            .split(',')
            .map(ingredient => ingredient.trim());
        if (ingredientsByComma.length === 0) {
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
                            open={openCategoryDropdown}
                            value={categoryValue}
                            items={categories}
                            setOpen={setOpenCategoryDropdown}
                            setValue={setCategoryValue}
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
