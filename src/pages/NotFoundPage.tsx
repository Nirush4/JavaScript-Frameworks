import { Button, Container, Text, Title, Space } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { type JSX } from 'react';

const NotFoundPage = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <Container
      style={{
        textAlign: 'center',
        paddingTop: '20vh',
        paddingBottom: '10vh',
      }}
    >
      <Title order={1} style={{ fontSize: 72, fontWeight: 700 }}>
        404
      </Title>
      <Title order={2} style={{ marginTop: 16 }}>
        Page Not Found
      </Title>
      <Text color='dimmed' size='lg' style={{ marginTop: 12 }}>
        Sorry, the page you are looking for does not exist.
      </Text>
      <Space h='md' />
      <Button size='md' variant='outline' onClick={() => navigate('/')}>
        Go Home
      </Button>
    </Container>
  );
};

export default NotFoundPage;
