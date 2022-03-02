import { NavBar } from "./NavBar";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import {BrowserRouter as Router} from "react-router-dom"


describe("NavBar", () => {
   let mockFunction;
   beforeEach(() => {
     mockFunction = jest.fn();
     // eslint-disable-next-line testing-library/no-render-in-setup
     render( <NavBar />, { wrapper: MemoryRouter } );
   });


   test("It renders the nav div", () => {
       let div = screen.getByRole("banner");
       expect(div).toBeInTheDocument();
     });

    //  test("it renders", () => {
    //    const navigation = screen.getByRole("nav");
    //    expect(navigation.textContent).toMatch("");
    //  });

    it('should take a snapshot', () => {
        // render(<NavBar />, { wrapper: MemoryRouter })
        const { asFragment } = render(<NavBar />, { wrapper: MemoryRouter })
        
        expect(asFragment(<NavBar />)).toMatchSnapshot()
      })

   });
