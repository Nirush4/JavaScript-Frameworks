import { Button, Container, Text, Title, Space } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, type JSX } from 'react';

const NotFoundPage = (): JSX.Element => {
  const navigate = useNavigate();
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <main
      role='main'
      aria-labelledby='notfound-title'
      className='min-h-screen flex items-center justify-center'
    >
      <Container
        style={{
          textAlign: 'center',
          paddingTop: '20vh',
          paddingBottom: '10vh',
        }}
      >
        <Title
          order={1}
          style={{ fontSize: 72, fontWeight: 700 }}
          aria-hidden='true'
        >
          404
        </Title>

        <Title
          order={2}
          id='notfound-title'
          ref={headingRef}
          tabIndex={-1}
          style={{ marginTop: 16 }}
        >
          Page Not Found
        </Title>

        <Text c='dimmed' size='lg' style={{ marginTop: 12 }} role='status'>
          Sorry, the page you are looking for does not exist or may have been
          moved.
        </Text>

        <Space h='md' />

        <Button
          size='md'
          variant='outline'
          onClick={() => navigate('/')}
          aria-label='Go back to homepage'
        >
          Go Home
        </Button>
      </Container>
    </main>
  );
};

export default NotFoundPage;
