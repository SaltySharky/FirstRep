import { auth } from "./firebase";
import { createUserWithEmailAndPassword,GoogleAuthProvider,sendEmailVerification,sendPasswordResetEmail,signInWithEmailAndPassword, signInWithPopup, updatePassword } from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
};
export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    //result.user can save user information to firestore
    return result
};


export const doSignOut = () => {
    return auth.signOut();
};

/*
export const doPasswordReset = (email) => {
    return sendPasswordResetEmail(auth,email);
};

export const doPasswordChange = (password) => {
    return updatePassword(auth.currentUser, password);
};

export const doSendEmailVerification = () => {
    return sendEmailVerification(auth.currentUser, {
        url: `${window.location.origin}/home`
    })
}
*/