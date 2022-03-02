import { default as Login } from './Login'
import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import * as ReactRouterDom from 'react-router-dom';
import { MemoryRouter, Router as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import jwt_decode from 'jwt-decode';
import axios from 'axios'

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));


describe('Login', () => {

    test('it renders the page', () => {
        render(<Login />, {wrapper: MemoryRouter});
        const heading = screen.getByRole("heading");
        expect(heading.textContent).toMatch("Login");
    });

    test('it navigates to the register page on button click', async () => {
        render(<Login />, {wrapper: MemoryRouter});
        const registerBtn = screen.getByRole("button", { name: "Register here!" });
        userEvent.click(registerBtn);

    });

    test('it allows users to input username', () => {
        render(<Login />, {wrapper: MemoryRouter});
        const usernameInput = screen.getByLabelText("Username");
        fireEvent.change(usernameInput, { target: { value: "testuser45"} });
        expect(usernameInput.value).toBe("testuser45");
    });

    test('it allows users to input password', () => {
        render(<Login />, {wrapper: MemoryRouter});
        const passwordInput = screen.getByLabelText("Password");
        fireEvent.change(passwordInput, { target: { value: "testpassword123"} });
        expect(passwordInput.value).toBe("testpassword123");
    });



    test('it renders textbox', () => {
        render(<Login />, {wrapper: MemoryRouter})
        const login = screen.getAllByRole('textbox');
        expect(login).toBeInstanceOf(Array);
    });
    test('it renders heading', () => {
        render(<Login />, {wrapper: MemoryRouter})
        const login = screen.getAllByRole('heading');
        expect(login[0]).toBeInTheDocument();
    });
    test('it submits a form', () => {
        render(<Login />, {wrapper: MemoryRouter})
        const authUser = jest.fn()
        const submit = screen.getByTestId('submit');
        userEvent.click(submit)
        expect(authUser).toHaveBeenCalled();
    });
    test('it lets you put in a username', () => {
        render(<Login />, {wrapper: MemoryRouter})

        const username = screen.getByLabelText('Username');
        userEvent.type(username)
        // expect(authUser).toHaveBeenCalled();
    });


});
