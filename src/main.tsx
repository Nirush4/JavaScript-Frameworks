import '@mantine/core/styles.css';
import './index.css';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <>
      <ColorSchemeScript defaultColorScheme='light' />
      <MantineProvider
        defaultColorScheme='light'
        theme={{
          primaryColor: 'indigo',
          colors: {
            dark: [
              '#C1C2C5',
              '#A6A7AB',
              '#909296',
              '#5C5F66',
              '#373A40',
              '#2C2E33',
              '#25262B',
              '#1A1B1E',
              '#141517',
              '#101113',
            ],
          },
        }}
      >
        <StrictMode>
          <App />
        </StrictMode>
      </MantineProvider>
    </>
  </React.StrictMode>
);
