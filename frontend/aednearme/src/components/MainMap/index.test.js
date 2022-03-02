import { default as MainMap } from './MainMap'
import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import * as ReactRouterDom from 'react-router-dom';
import { MemoryRouter, Router as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import jwt_decode from 'jwt-decode';
import axios from 'axios'

jest.mock("axios");


describe('Main Map', () => {

    it('renders Loading...', () => {
        render(<MainMap />, { wrapper: MemoryRouter })
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    // test('it renders the page', () => {
    //     render(<MainMap />, { wrapper: MemoryRouter });
    //     const div = screen.getByRole("div");
    //     expect(div).toBeInTheDocument()
    // });

    // test('it renders heading', () => {
    //     render(<MainMap />, {wrapper: MemoryRouter})
    //     const login = screen.getAllByRole('heading');
    //     expect(login[0]).toBeInTheDocument();
    // });

    // test('it lets you put in a username', () => {
    //     render(<MainMap />, {wrapper: MemoryRouter})

    //     const username = screen.getByLabelText('Username');
    //     userEvent.type(username)
    //     // expect(authUser).toHaveBeenCalled();
    // });

    it('should take a snapshot', () => {
        render(<MainMap />, { wrapper: MemoryRouter })
        const { asFragment } = render(<MainMap />, { wrapper: MemoryRouter })
        
        expect(asFragment(<MainMap />)).toMatchSnapshot()
      })

});
