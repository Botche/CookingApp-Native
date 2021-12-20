# Cooking app created with react native

This project is created for VTU. The application presents saved recipes with pictures and you can create recipes so all users can see them, but only the creator of the recipe can delete it. 

## How to build
*Be sure your node version is **v14.15.0** or above
```shell
yarn install
```

*On ios be sure you installed pods in the ios folder with ```cd ios && pod install```

## How to start
1. For android type: ```yarn run android```
1. For ios type: ```yarn run ios```

## Database Architecture
* Users
    - id
    - email
    - password

* Recipes
    - id
        - author_id
        - categoryId
        - description
        - ingredients
            - id
                - name
        - photo_url
        - time
        - title

* Categories
    - id
        - name

## Screens
* Login
* Register
* Recipes
* Create Recipe
* Recipe
