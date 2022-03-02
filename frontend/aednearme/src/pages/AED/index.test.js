import { render, fireEvent, screen, cleanup, within } from '@testing-library/react';
import { MemoryRouter, Router as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { createMemoryHistory } from 'history'
import {default as AEDhowto} from './AEDhowto';
import axios from 'axios'


describe('AEDhowto', () => {

  // beforeEach(() => {
  //   render(<App />, { wrapper: MemoryRouter })
  // });


  // Rendering

  it('renders welcome message', () => {
    render(<AEDhowto />, { wrapper: MemoryRouter })
    expect(screen.getByText('How to use an AED')).toBeInTheDocument();
  });

//   test('list contains 1 buttons', () => {
//     render(<AEDhowto />, { wrapper: MemoryRouter });
  
//     // const listElement = screen.getAllByRole('button');
//     const listItems = screen.getAllByRole('button');
  
    
//     expect(listItems.length).toEqual(1);
//   });



  // Snapshot

  it('should take a snapshot', () => {
    render(<AEDhowto />, { wrapper: MemoryRouter })
    const { asFragment } = render(<AEDhowto />, { wrapper: MemoryRouter })
    
    expect(asFragment(<AEDhowto />)).toMatchSnapshot()
  })

  

  
})

