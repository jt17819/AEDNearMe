import { render, fireEvent, screen, cleanup, within } from '@testing-library/react';
import { MemoryRouter, Router as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { createMemoryHistory } from 'history'
import {default as MobileMenu} from './MobileMenu';
import axios from 'axios'


describe('Mobile Menu', () => {

  // beforeEach(() => {
  //   render(<App />, { wrapper: MemoryRouter })
  // });



  // Rendering

  it('renders a button', () => {
    render(<MobileMenu />, { wrapper: MemoryRouter })
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('list contains 1 buttons', () => {
    render(<MobileMenu />, { wrapper: MemoryRouter });
  
    // const listElement = screen.getAllByRole('button');
    const listItems = screen.getAllByRole('button');
  
    
    expect(listItems.length).toEqual(1);
  });



  // Snapshot

  it('should take a snapshot', () => {
    render(<MobileMenu />, { wrapper: MemoryRouter })
    const { asFragment } = render(<MobileMenu />, { wrapper: MemoryRouter })
    
    expect(asFragment(<MobileMenu />)).toMatchSnapshot()
  })

  

  
})

