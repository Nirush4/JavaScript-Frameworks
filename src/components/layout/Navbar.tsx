import { useState, useEffect, type JSX, useRef } from 'react';
import {
  AppShell,
  Container,
  Group,
  Burger,
  Drawer,
  Image,
  Stack,
  ActionIcon,
  Box,
  Indicator,
  TextInput,
} from '@mantine/core';
import { IconSearch, IconUser, IconShoppingBag } from '@tabler/icons-react';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { useCartStore } from '../../store/cartStore';
import ShoppingCart from './ShoppingCart';
import { useDebounce } from '../../hooks/useDebounce';

export default function Navbar(): JSX.Element {
  const [opened, setOpened] = useState(false);
  const [cartOpened, setCartOpened] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const searchFromUrl = searchParams.get('search') || '';
  const [search, setSearch] = useState(searchFromUrl);
  const debouncedSearch = useDebounce(search, 700);

  const totalItems = useCartStore((state) => state.totalItems());

  const toggleDrawer = () => setOpened((o) => !o);

  const firstRender = useRef(true);

  useEffect(() => {
    const trimmed = debouncedSearch.trim();

    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (
      window.location.pathname.startsWith('/products/') &&
      window.location.pathname !== '/products'
    ) {
      return;
    }

    if (trimmed) {
      navigate(`/products?search=${trimmed}`);
    } else {
      navigate('/products');
    }
  }, [debouncedSearch, navigate]);

  useEffect(() => {
    setSearch(searchFromUrl);
  }, [searchFromUrl]);

  const navLinks = (
    <>
      {[
        { to: '/', label: 'Home' },
        { to: '/products', label: 'Products' },
        { to: '/about', label: 'About' },
        { to: '/contact', label: 'Contact' },
      ].map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `text-black no-underline ${isActive ? 'font-bold' : 'font-normal'}`
          }
        >
          {label}
        </NavLink>
      ))}
    </>
  );

  return (
    <>
      <AppShell.Header
        component='header'
        style={{ backgroundColor: 'white', borderBottom: '1px solid #eee' }}
      >
        <Container
          size='xl'
          h='100%'
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Burger
            opened={opened}
            onClick={toggleDrawer}
            hiddenFrom='md'
            size='sm'
            aria-label={
              opened ? 'Close navigation menu' : 'Open navigation menu'
            }
            aria-expanded={opened}
            aria-controls='mobile-navigation'
          />

          <Box w={200} component={NavLink} to='/' visibleFrom='md'>
            <Image src={logo} alt='Homepage - Store logo' />
          </Box>

          <nav aria-label='Main navigation'>
            <Group visibleFrom='sm' gap='xl'>
              {navLinks}
            </Group>
          </nav>

          <Group gap='md'>
            <div>
              <label htmlFor='search-input' className='sr-only'>
                Search products
              </label>
              <TextInput
                id='search-input'
                placeholder='Search products...'
                value={search}
                onChange={(e) => setSearch(e.currentTarget.value)}
                leftSection={<IconSearch size={16} aria-hidden='true' />}
                size='sm'
                radius='md'
                visibleFrom='sm'
              />
            </div>

            <ActionIcon variant='subtle' color='dark' aria-label='User account'>
              <IconUser size={22} aria-hidden='true' />
            </ActionIcon>

            <Indicator
              label={totalItems > 20 ? '20+' : totalItems}
              size={22}
              disabled={totalItems === 0}
              color='red'
              offset={6}
              withBorder
            >
              <ActionIcon
                variant='subtle'
                color='dark'
                onClick={() => setCartOpened(true)}
                aria-label={`Shopping cart with ${totalItems} items`}
              >
                <IconShoppingBag size={22} aria-hidden='true' />
              </ActionIcon>
            </Indicator>
          </Group>
        </Container>
      </AppShell.Header>

      <Drawer
        id='mobile-navigation'
        opened={opened}
        onClose={() => setOpened(false)}
        padding='md'
        size='75%'
        role='dialog'
        aria-modal='true'
        aria-label='Mobile navigation menu'
      >
        <Box component={NavLink} to='/' hiddenFrom='md'>
          <Image src={logo} alt='Homepage - Store logo' w={200} pb={40} />
        </Box>

        <div>
          <label htmlFor='mobile-search' className='sr-only'>
            Search products
          </label>
          <TextInput
            id='mobile-search'
            placeholder='Search products...'
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            leftSection={<IconSearch size={16} aria-hidden='true' />}
            size='sm'
            radius='md'
            mb='lg'
          />
        </div>

        <nav aria-label='Mobile navigation'>
          <Stack gap='lg'>{navLinks}</Stack>
        </nav>
      </Drawer>

      <ShoppingCart opened={cartOpened} onClose={() => setCartOpened(false)} />
    </>
  );
}
