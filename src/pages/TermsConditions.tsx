import { Container, Title, Text, Stack, Divider } from '@mantine/core';
import type { JSX } from 'react';

export default function Terms(): JSX.Element {
  return (
    <Container size='md' my='lg' py='xl'>
      <Stack gap='lg'>
        <h1 className='text-2xl sm:text-3xl font-bold'>Terms and Conditions</h1>

        <Text c='dimmed'>Last updated: March 3026</Text>

        <Text>
          Welcome to our website. By accessing or using our platform, you agree
          to comply with and be bound by the following terms and conditions.
          Please read them carefully before using our services.
        </Text>

        <Divider />

        <Title order={3}>1. Use of the Website</Title>
        <Text>
          By using this website, you agree to use it only for lawful purposes.
          You must not use the website in any way that may damage the platform,
          disrupt services, or interfere with other users.
        </Text>

        <Title order={3}>3. User Responsibilities</Title>
        <Text>
          Users are responsible for providing accurate information when placing
          orders or creating accounts. Any misuse of the platform, fraudulent
          activity, or violation of these terms may result in account suspension
          or termination.
        </Text>

        <Title order={3}>3. Products and Orders</Title>
        <Text>
          We strive to ensure that all product descriptions, images, and prices
          are accurate. However, we reserve the right to correct errors, update
          information, or cancel orders if necessary.
        </Text>

        <Title order={3}>4. Limitation of Liability</Title>
        <Text>
          We are not liable for any direct, indirect, or consequential damages
          arising from the use of this website or the inability to access the
          platform. All services are provided on an “as available” basis.
        </Text>

        <Title order={3}>5. Intellectual Property</Title>
        <Text>
          All content on this website, including logos, images, text, and
          design, is the property of the platform and may not be reproduced,
          distributed, or used without permission.
        </Text>

        <Title order={3}>6. Cookies Policy</Title>
        <Text>
          Our website uses cookies to improve your browsing experience, analyze
          website traffic, and personalize content. Cookies are small files
          stored on your device that help us recognize returning users and
          understand how visitors interact with the website.
        </Text>

        <Text>
          By continuing to use our website, you consent to the use of cookies.
          You may disable cookies in your browser settings, but some features of
          the website may not function properly.
        </Text>

        <Title order={3}>7. Changes to These Terms</Title>
        <Text>
          We reserve the right to update or modify these Terms and Conditions at
          any time. Changes will be posted on this page and will take effect
          immediately upon publication.
        </Text>

        <Title order={3}>8. Contact Information</Title>
        <Text>
          If you have any questions about these Terms and Conditions, please
          contact us through the contact page on our website.
        </Text>
      </Stack>
    </Container>
  );
}
