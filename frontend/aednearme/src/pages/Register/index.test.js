import { default as Register } from './Register'
import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import * as ReactRouterDom from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import axios from 'axios'

// import * as helpers from '../../helpers/requests';

// jest.mock("jwt-decode");


jest.mock("axios");

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));


describe('Register', () => {
    test('it renders the page', () => {
        render(<Register />, { wrapper: ReactRouterDom.MemoryRouter });
        const heading = screen.getByTestId("heading");
        expect(heading.textContent).toMatch("Register here");
    })
    test('it renders a form', () => {
        render(<Register />, { wrapper: ReactRouterDom.MemoryRouter });
        const form = screen.getByTestId("form");
        expect(form).toBeInTheDocument();
    });

    test('it allows users to input first name', () => {
        render(<Register />, { wrapper: ReactRouterDom.MemoryRouter });
        const firstNameInput = screen.getByLabelText("First Name");
        fireEvent.change(firstNameInput, { target: { value: "test"} });
        expect(firstNameInput.value).toBe("test");
    });

    test('it allows users to input last name', () => {
        render(<Register />, { wrapper: ReactRouterDom.MemoryRouter });
        const lastNameInput = screen.getByLabelText("Last Name");
        fireEvent.change(lastNameInput, { target: { value: "test"} });
        expect(lastNameInput.value).toBe("test");
    });

    test('it allows users to input username', () => {
        render(<Register />, { wrapper: ReactRouterDom.MemoryRouter });
        const usernameInput = screen.getByLabelText("Username");
        fireEvent.change(usernameInput, { target: { value: "test"} });
        expect(usernameInput.value).toBe("test");
    });

    test('it allows users to input email', () => {
        render(<Register />, { wrapper: ReactRouterDom.MemoryRouter });
        const emailInput = screen.getByLabelText("Email");
        fireEvent.change(emailInput, { target: { value: "test@email.com"} });
        expect(emailInput.value).toBe("test@email.com");
    });

    test('it allows users to input password', () => {
        render(<Register />, { wrapper: ReactRouterDom.MemoryRouter });
        const passwordInput = screen.getByLabelText("Password");
        fireEvent.change(passwordInput, { target: { value: "testpassword123"} });
        expect(passwordInput.value).toBe("testpassword123");
    });

    test('it allows users to input password-confirm', () => {
        render(<Register />, { wrapper: ReactRouterDom.MemoryRouter });
        const passwordConfirmInput = screen.getByLabelText("Confirm Password");
        fireEvent.change(passwordConfirmInput, { target: { value: "testpassword123"} });
        expect(passwordConfirmInput.value).toBe("testpassword123");
    });

});