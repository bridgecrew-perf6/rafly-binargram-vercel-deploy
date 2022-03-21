import { Provider } from "react-redux";
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import store from '../../../redux/store';

import LoginContainer from '../Login';

const RootComponent = ({ children }) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
};

describe('Login Testing', () => {

    beforeEach(() => {
        render(<LoginContainer />, { wrapper: RootComponent });
    });

    test('Sign In text on Sign In page are successfully shown.', () => {
        const textSignIn = screen.getByText("Sign In");
        expect(textSignIn).toBeInTheDocument();
    });

    test('Sign In email input.', () => {
        userEvent.type(screen.getByTestId('input-email'), "ihsan@binarc.co.id");
        expect(screen.getByTestId('input-email')).toHaveValue("ihsan@binarc.co.id");
    });

    test('Sign In password input.', () => {
        userEvent.type(screen.getByTestId('input-password'), "12341234");
        expect(screen.getByTestId('input-password')).toHaveValue("12341234");
    });

    test('Error email input upon sign in.', async () => {
        const inputEmail = screen.getByTestId('input-email');
        userEvent.type(inputEmail, "w{backspace}");
        userEvent.tab();
        await waitFor(() => expect(screen.getByTestId("error-email")).toBeInTheDocument());
    });

    test('Error password input upon sign in.', async () => {
        const inputPassword = screen.getByTestId('input-password');
        userEvent.type(inputPassword, "w{backspace}");
        userEvent.tab();
        await waitFor(() => expect(screen.getByTestId("error-password")).toBeInTheDocument());
    });
})