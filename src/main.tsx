import '@mantine/core/styles.css';
import './index.css';
import ReactDOM from 'react-dom/client';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ProductsPage from './pages/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'products/:id', element: <ProductDetailsPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'contact', element: <ContactPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
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
      {' '}
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </MantineProvider>
  </>
);
