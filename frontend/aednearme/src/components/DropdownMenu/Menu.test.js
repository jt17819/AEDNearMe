import { render, fireEvent, screen, cleanup, within } from '@testing-library/react';
import { MemoryRouter, Router as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { createMemoryHistory } from 'history'
import {MyMenu} from './Menu';
import axios from 'axios'


describe('Menu', () => {

  // beforeEach(() => {
  //   render(<App />, { wrapper: MemoryRouter })
  // });



  // Rendering

  it('renders welcome message', () => {
    render(<MyMenu />, { wrapper: MemoryRouter })
    expect(screen.getByTestId('span')).toBeInTheDocument();
  });

//   test('list contains 1 buttons', () => {
//     render(<MyMenu />, { wrapper: MemoryRouter });
  
//     // const listElement = screen.getAllByRole('button');
//     const listItems = screen.getAllByRole('button');
  
    
//     expect(listItems.length).toEqual(1);
//   });



  // Snapshot

  it('should take a snapshot', () => {
    render(<MyMenu />, { wrapper: MemoryRouter })
    const { asFragment } = render(<MyMenu />, { wrapper: MemoryRouter })
    
    expect(asFragment(<MyMenu />)).toMatchSnapshot()
  })

  

  
})

