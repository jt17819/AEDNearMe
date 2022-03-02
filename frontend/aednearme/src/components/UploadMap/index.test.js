import { render, fireEvent, screen, cleanup, within } from '@testing-library/react';
import { MemoryRouter, Router as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { createMemoryHistory } from 'history'
import {default as UploadMap} from './UploadMap';
import axios from 'axios'

jest.mock("axios");

describe('UploadMap', () => {

  // beforeEach(() => {
  //   render(<App />, { wrapper: MemoryRouter })
  // });


  // Rendering

  it('renders welcome message', () => {
    render(<UploadMap />, { wrapper: MemoryRouter })
    expect(screen.getByText('AED here')).toBeInTheDocument();
  });

  // test('list contains 1 buttons', () => {
  //   render(<UploadMap />, { wrapper: MemoryRouter });
  
  //   // const listElement = screen.getAllByRole('button');
  //   const listItems = screen.getAllByRole('button');
  
    
  //   expect(listItems.length).toEqual(1);
  // });



  // Snapshot

  it('should take a snapshot', () => {
    render(<UploadMap />, { wrapper: MemoryRouter })
    const { asFragment } = render(<UploadMap />, { wrapper: MemoryRouter })
    
    expect(asFragment(<UploadMap />)).toMatchSnapshot()
  })

  

  
})

