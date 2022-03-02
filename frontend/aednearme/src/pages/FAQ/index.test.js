import { render, fireEvent, screen, cleanup, within } from '@testing-library/react';
import { MemoryRouter, Router as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { createMemoryHistory } from 'history'
import {default as FAQ} from './FAQ';
import axios from 'axios'


describe('FAQ', () => {

  // beforeEach(() => {
  //   render(<App />, { wrapper: MemoryRouter })
  // });


  // Rendering

  it('renders welcome message', () => {
    render(<FAQ />, { wrapper: MemoryRouter })
    expect(screen.getByText('Frequently asked questions')).toBeInTheDocument();
  });

  test('list contains 2 buttons', () => {
    render(<FAQ />, { wrapper: MemoryRouter });
  
    // const listElement = screen.getAllByRole('button');
    const listItems = screen.getAllByRole('heading');
  
    
    expect(listItems.length).toEqual(1);
  });



  // Snapshot

  it('should take a snapshot', () => {
    render(<FAQ />, { wrapper: MemoryRouter })
    const { asFragment } = render(<FAQ />, { wrapper: MemoryRouter })
    
    expect(asFragment(<FAQ />)).toMatchSnapshot()
  })

  

  
})
