import { Provider } from "react-redux";
import { render, screen, waitFor } from '@testing-library/react';
import userEvent  from '@testing-library/user-event';
import store from '../../../redux/store';

import UploadContainer from '../Upload';

jest.mock("next/router", () => ({
    useRouter() {
        return {
            route: "/",
            pathname: "",
            query: "",
            asPath: "",
            push: jest.fn()
        }
    }
}))

const RootComponent = ({ children }) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
};

describe('Upload Testing', () => {
    beforeEach(() => {
        render(<UploadContainer />, { wrapper: RootComponent });
    });

    test('Upload container rendered successfully.', () => {
        const captionText = screen.getByText('Caption');
        expect(captionText).toBeInTheDocument();
    });

    test('Title is successfully filled out.', () =>  {
        userEvent.type(screen.getByTestId('input-title'), "Title Testing");
        expect(screen.getByTestId('input-title')).toHaveValue("Title Testing");
    });

    test('Caption is successfully filled out.', () => {
        userEvent.type(screen.getByTestId('input-caption'), "This is caption testing with Jest");
        expect(screen.getByTestId('input-caption')).toHaveValue("This is caption testing with Jest")
    });

    test('Error message upon title input.', async () => {
        const inputTitle = screen.getByTestId('input-title');
        userEvent.type(inputTitle, "w{backspace}");
        userEvent.tab();
        await waitFor(() => expect(screen.getByTestId("error-title")).toBeInTheDocument());
    });

    test('Error message upon caption input.', async () => {
        const inputCaption = screen.getByTestId('input-caption');
        userEvent.type(inputCaption, "w{backspace}");
        userEvent.tab();
        await waitFor(() => expect(screen.getByTestId("error-caption")).toBeInTheDocument());
    });
});