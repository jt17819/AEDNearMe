import axios from "axios";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Router as Router } from 'react-router-dom';

import { default as Upload } from "./Upload";
jest.mock("axios");

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Upload", () => {
  test("render", async () => {
   
    render(<Upload />, { wrapper: MemoryRouter } );

    const lat = screen.getByLabelText("Latitude");
    const long = screen.getByLabelText("Longitude");
    // const access = screen.getByLabelText("Access?");
    const comments = screen.getByLabelText("Comments...");
    // const sub = screen.getByLabelText("Submit");

    userEvent.type(lat, 'No letters');
    await waitFor(() => expect(lat.textContent).toBe(''));
    userEvent.type(long, 'No letters');
    await waitFor(() => expect(long.textContent).toBe(''));
    // userEvent.type(access, "public");
    // await waitFor(() => expect(access.textContent).toBe("public"));
    userEvent.type(comments, "asdfgh");
    await waitFor(() => expect(comments.textContent).toBe("asdfgh"));

    // userEvent.click(sub);
  });

  test('list contains 2 buttons', () => {
    render(<Upload />, { wrapper: MemoryRouter });
  
    // const listElement = screen.getAllByRole('button');
    const listItems = screen.getAllByRole('button');  
    expect(listItems.length).toEqual(3);
  });

});
