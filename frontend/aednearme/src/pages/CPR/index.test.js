import { render, fireEvent, screen, cleanup, within } from '@testing-library/react';
import { MemoryRouter, Router as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { createMemoryHistory } from 'history'
import {default as CPRhowto} from './CPRhowto';
import axios from 'axios'


describe('CPRhowto', () => {

  // beforeEach(() => {
  //   render(<App />, { wrapper: MemoryRouter })
  // });


  // Rendering

  it('renders welcome message', () => {
    render(<CPRhowto />, { wrapper: MemoryRouter })
    expect(screen.getByText('The four simple steps of CPR (Cardiopulmonary Resuscitation)')).toBeInTheDocument();
  });

//   test('list contains 2 buttons', () => {
//     render(<CPRhowto />, { wrapper: MemoryRouter });
  
//     // const listElement = screen.getAllByRole('button');
//     const listItems = screen.getAllByRole('button');
  
    
//     expect(listItems.length).toEqual(1);
//   });



  // Snapshot

  it('should take a snapshot', () => {
    render(<CPRhowto />, { wrapper: MemoryRouter })
    const { asFragment } = render(<CPRhowto />, { wrapper: MemoryRouter })
    
    expect(asFragment(<CPRhowto />)).toMatchSnapshot()
  })

  

  
})