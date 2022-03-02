import { render, fireEvent, screen, cleanup, within } from '@testing-library/react';
import { MemoryRouter, Router as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { createMemoryHistory } from 'history'
import {default as NotLogged} from './NotLogged';
import axios from 'axios'

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Not Logged', () => {

  // beforeEach(() => {
  //   render(<App />, { wrapper: MemoryRouter })
  // });


  // Rendering

  it('renders welcome message', () => {
    render(<NotLogged />, { wrapper: MemoryRouter })
    expect(screen.getByText('Sign in to register new AED')).toBeInTheDocument();
  });

  test('list contains 2 buttons', () => {
    render(<NotLogged />, { wrapper: MemoryRouter });
  
    // const listElement = screen.getAllByRole('button');
    const listItems = screen.getAllByRole('button');
  
    
    expect(listItems.length).toEqual(1);
  });



  // Snapshot

  it('should take a snapshot', () => {
    render(<NotLogged />, { wrapper: MemoryRouter })
    const { asFragment } = render(<NotLogged />, { wrapper: MemoryRouter })
    
    expect(asFragment(<NotLogged />)).toMatchSnapshot()
  })

  

  
})

