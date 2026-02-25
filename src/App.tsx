import { AppShell } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import Navbar from './components/layout/Navbar';

export default function App() {
  return (
    <AppShell header={{ height: 70 }} padding='md'>
      <Navbar />

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
