import { default as DrawerComponent } from "./Drawer";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import {BrowserRouter as Router} from "react-router-dom"


describe("Drawer", () => {
   let mockFunction;
   beforeEach(() => {
     mockFunction = jest.fn();
     // eslint-disable-next-line testing-library/no-render-in-setup
     render( <DrawerComponent />, { wrapper: MemoryRouter } );
   });

   test("It renders the AEDnearME link", () => {
        let link = screen.getByRole("link")
        expect(link).toBeInTheDocument();
     });

    //  test("it renders", () => {
    //    const navigation = screen.getByRole("nav");
    //    expect(navigation.textContent).toMatch("");
    //  });

    it('should take a snapshot', () => {
        // render(<DrawerComponent />, { wrapper: MemoryRouter })
        const { asFragment } = render(<DrawerComponent />, { wrapper: MemoryRouter })
        expect(asFragment(<DrawerComponent />)).toMatchSnapshot()
      })

   });
