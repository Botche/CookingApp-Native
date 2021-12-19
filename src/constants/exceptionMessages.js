const exceptionMessages = {
    // Create recipe
    titleRequired: 'Title is required!',
    photoUrlRequired: 'Photo url is required!',
    photoUrlInvalid: 'Photo url must be valid!',
    timeRequired: 'Time is required!',

    // Login/Register
    emailRequired: 'Email is required!',
    emailInvalid: 'Email is not valid!',
    emailAlreadyUsed: 'Email is already used!',
    passwordRequired: 'Password is required!',
    passwordIsWrong: 'Password is incorrect!',
    passwordMustMatch: 'Passwords must match!',
    passwordWeak: 'Password should be at least 6 characters!',
    userNotFound: 'User with such credentials does not exist!',
    tooManyAttempts: 'Too many bad attempts, please try again later!',
};

export default exceptionMessages;
