// // jest-dom adds custom jest matchers for asserting on DOM nodes.
// // allows you to do things like:
// // expect(element).toHaveTextContent(/react/i)
// // learn more: https://github.com/testing-library/jest-dom
// import '@testing-library/jest-dom';


import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  };

// import axios from 'axios';
// jest.mock('axios')
// axios.get.mockResolvedValue({ data: [ { latlng: [123, 456] }]})

global.React = React;
global.render = render;
global.userEvent = userEvent;
global.localStorage = localStorageMock;