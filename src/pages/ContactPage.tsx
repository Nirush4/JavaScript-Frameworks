import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema } from '../types/product';
import type { z } from 'zod';
import {
  TextInput,
  Textarea,
  Button,
  Group,
  Notification,
  Container,
} from '@mantine/core';
import { Check } from 'tabler-icons-react';
import Breadcrumbs from '../components/layout/Breadcrumbs';

export default function ContactForm() {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  type ContactFormData = z.infer<typeof contactSchema>;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormData) => {
    setLoading(true);

    setTimeout(() => {
      const storedMessages = localStorage.getItem('contactMessages');
      const existingMessages: ContactFormData[] = storedMessages
        ? JSON.parse(storedMessages)
        : [];
      const newMessage = { ...data, date: new Date().toISOString() };
      const updatedMessages = [...existingMessages, newMessage];
      localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));

      setSuccess(true);
      reset();
      setLoading(false);

      setTimeout(() => setSuccess(false), 4000);
    }, 1500);
  };

  return (
    <Container size='xl' className='pt-10'>
      <Breadcrumbs />
      <div className='max-w-xl p-5 mx-auto h-dvh mt-5 sm:mt-20'>
        <h1 className='font-bold text-xl sm:text-3xl text-center pb-10'>
          Contact Us
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label='Full Name'
            placeholder='John Doe'
            {...register('fullName')}
            error={errors.fullName?.message}
            mb='sm'
          />
          <TextInput
            label='Subject'
            placeholder='Your subject'
            {...register('subject')}
            error={errors.subject?.message}
            mb='sm'
          />
          <TextInput
            label='Email'
            placeholder='example@email.com'
            type='email'
            {...register('email')}
            error={errors.email?.message}
            mb='sm'
          />
          <Textarea
            label='Message'
            placeholder='Your message...'
            minRows={4}
            {...register('message')}
            error={errors.message?.message}
            mb='sm'
          />
          <Group gap='right' mt='md'>
            <Button type='submit' color='blue' loading={loading}>
              Send Message
            </Button>
          </Group>
          {success && (
            <Notification
              icon={<Check size={18} />}
              color='green'
              title='Success'
              mb='md'
              onClose={() => setSuccess(false)}
            >
              Your message has been sent successfully!
            </Notification>
          )}
        </form>
      </div>
    </Container>
  );
}
