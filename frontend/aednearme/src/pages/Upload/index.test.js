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

    userEvent.type(lat, 1234567);
    await waitFor(() => expect(lat.textContent).toBe(1234567));
    userEvent.type(long, 1234567);
    await waitFor(() => expect(long.textContent).toBe(1234567));
    // userEvent.type(access, "public");
    // await waitFor(() => expect(access.textContent).toBe("public"));
    userEvent.type(comments, "asdfgh");
    await waitFor(() => expect(comments.textContent).toBe("asdfgh"));

    // userEvent.click(sub);
  });
});
