const SignOut = () => {
        localStorage.removeItem('authToken');
        window.location.href = '/auth/sign-in';

};

export default SignOut;
