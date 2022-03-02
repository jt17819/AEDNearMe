import { render, fireEvent, screen, cleanup, within } from '@testing-library/react';
import { MemoryRouter, Router as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { createMemoryHistory } from 'history'
import App from './App';
import axios from 'axios'


describe('App', () => {

  // beforeEach(() => {
  //   render(<App />, { wrapper: MemoryRouter })
  // });



  // Rendering

  it('renders welcome message', () => {
    render(<App />, { wrapper: MemoryRouter })
    expect(screen.getByText('IN A LIFE THREATENING EMERGENCY, CALL 999 or 112')).toBeInTheDocument();
  });

  test('list contains 2 buttons', () => {
    render(<App />, { wrapper: MemoryRouter });
  
    // const listElement = screen.getAllByRole('button');
    const listItems = screen.getAllByRole('button');
  
    
    expect(listItems.length).toEqual(2);
  });



  // Snapshot

  it('should take a snapshot', () => {
    render(<App />, { wrapper: MemoryRouter })
    const { asFragment } = render(<App />, { wrapper: MemoryRouter })
    
    expect(asFragment(<App />)).toMatchSnapshot()
  })

  

  
})

