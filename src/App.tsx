import { AppShell } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './lib/utils/ScrollToTop';
import { ToastContainer } from 'react-toastify';

export default function App() {
  return (
    <AppShell header={{ height: 70 }}>
      <Navbar />
      <ToastContainer />

      <AppShell.Main>
        <ScrollToTop />
        <Outlet />
      </AppShell.Main>
      <Footer />
    </AppShell>
  );
}
