import { render, fireEvent, screen, cleanup, within } from '@testing-library/react';
import { MemoryRouter, Router as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { createMemoryHistory } from 'history'
import { default as Quiz } from './Quiz';
import axios from 'axios'

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Quiz', () => {
    let handleStartMock;

  // beforeEach(() => {
  //   render(<App />, { wrapper: MemoryRouter })
  // });


  // Rendering

  it('renders CPR button', () => {
    render(<Quiz />, { wrapper: MemoryRouter })
    expect(screen.getByRole("button", { name: "CPR" })).toBeInTheDocument();
  });

  it('renders Start Quiz button', () => {
    render(<Quiz />, { wrapper: MemoryRouter })
    expect(screen.getByRole("button", { name: "Start Quiz" })).toBeInTheDocument();
  });

//   it('renders results heading', () => {
//     render(<Quiz />, { wrapper: MemoryRouter })
//     expect(screen.getByRole("heading", { name: "Results: 0/0" })).toBeInTheDocument();
//   });

  test('list contains 2 buttons', () => {
    render(<Quiz />, { wrapper: MemoryRouter });
  
    // const listElement = screen.getAllByRole('button');
    const listItems = screen.getAllByRole('button');  
    expect(listItems.length).toEqual(2);
  });


    test('it calls on handleStart prop on form click', () => {
        handleStartMock = jest.fn();
        render(<MemoryRouter><Quiz /></MemoryRouter>);
        let startQuizButton = screen.getByText('Start Quiz');
        userEvent.click(startQuizButton)
        expect(handleStartMock).toHaveBeenCalled();
    })



  // Snapshot

  it('should take a snapshot', () => {
    render(<Quiz />, { wrapper: MemoryRouter })
    const { asFragment } = render(<Quiz />, { wrapper: MemoryRouter })
    
    expect(asFragment(<Quiz />)).toMatchSnapshot()
  })

  

  
})

