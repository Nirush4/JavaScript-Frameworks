import { useState, type JSX } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema } from '../types/product';
import type { z } from 'zod';
import {
  TextInput,
  Textarea,
  Button,
  Notification,
  Container,
  Accordion,
  Select,
} from '@mantine/core';
import { Check } from 'tabler-icons-react';
import Breadcrumbs from '../components/layout/Breadcrumbs';

export default function ContactForm(): JSX.Element {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  type ContactFormData = z.infer<typeof contactSchema>;

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: '',
      email: '',
      reason: '',
      orderNumber: '',
      message: '',
    },
  });

  const onSubmit = (data: ContactFormData) => {
    setLoading(true);

    setTimeout(() => {
      const storedMessages = localStorage.getItem('contactMessages');

      const existingMessages = storedMessages ? JSON.parse(storedMessages) : [];

      const newMessage = {
        ...data,
        date: new Date().toISOString(),
      };

      const updatedMessages = [...existingMessages, newMessage];

      localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));

      setSuccess(true);
      reset();

      setLoading(false);

      setTimeout(() => setSuccess(false), 4000);
    }, 1500);
  };

  return (
    <Container size='xl' className='pt-10 pb-15'>
      <Breadcrumbs />

      <div className='text-center mt-10 mx-auto'>
        <h1 className='text-2xl sm:text-4xl font-bold'>Contact Us</h1>
        <p className='text-gray-500 mt-3'>
          Have questions about your order or products? Our support team is here
          to help. We usually respond within 24 hours.
        </p>
      </div>

      <div className='grid md:grid-cols-2 gap-12 mt-16 mx-auto'>
        <div className='space-y-6'>
          <div>
            <h2 className='text-xl sm:text-2xl font-bold'>Get in touch</h2>
            <p className='text-gray-500 mt-2'>
              You can reach us using the form or the information below.
            </p>
          </div>

          <div className='space-y-4 text-gray-700'>
            <p>
              <strong>Email:</strong> support@onlineshopping.com
            </p>
            <p>
              <strong>Phone:</strong> +1 234 567 890
            </p>
            <p>
              <strong>Support Hours:</strong> Mon – Fri / 9AM – 6PM
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='space-y-4 p-6 border rounded-lg bg-white shadow-sm'
        >
          {success && (
            <Notification
              icon={<Check size={18} />}
              color='green'
              title='Message Sent'
              onClose={() => setSuccess(false)}
            >
              Thank you for contacting us. Our team will reply within 24 hours.
            </Notification>
          )}

          <TextInput
            label='Full Name'
            placeholder='John Doe'
            {...register('fullName')}
            error={errors.fullName?.message}
          />

          <TextInput
            label='Email'
            type='email'
            placeholder='example@email.com'
            {...register('email')}
            error={errors.email?.message}
          />

          <Controller
            name='reason'
            control={control}
            render={({ field }) => (
              <Select
                label='Contact Reason'
                placeholder='Select reason'
                data={[
                  'Order Issue',
                  'Shipping Question',
                  'Return / Refund',
                  'Product Question',
                  'Other',
                ]}
                value={field.value}
                onChange={field.onChange}
                error={errors.reason?.message}
              />
            )}
          />

          <TextInput
            label='Order Number (optional)'
            placeholder='#12345'
            {...register('orderNumber')}
          />

          <Textarea
            label='Message'
            placeholder='Write your message...'
            minRows={4}
            {...register('message')}
            error={errors.message?.message}
          />

          <Button type='submit' fullWidth loading={loading}>
            Send Message
          </Button>
        </form>
      </div>

      <div className='mt-24 max-w-3xl mx-auto'>
        <h2 className='text-xl sm:text-2xl font-bold text-center mb-8'>
          Frequently Asked Questions
        </h2>

        <Accordion>
          <Accordion.Item value='shipping'>
            <Accordion.Control>How long does shipping take?</Accordion.Control>
            <Accordion.Panel>
              Orders are usually delivered within 3–7 business days depending on
              your location.
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value='returns'>
            <Accordion.Control>What is your return policy?</Accordion.Control>
            <Accordion.Panel>
              You can return items within 30 days of delivery if they are unused
              and in original condition.
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value='tracking'>
            <Accordion.Control>How can I track my order?</Accordion.Control>
            <Accordion.Panel>
              Once your order ships, you will receive a tracking number via
              email.
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </div>

      <div className='grid md:grid-cols-3 gap-8 text-center mt-20 max-w-5xl mx-auto'>
        <div>
          <h3 className='font-semibold'>24h Response</h3>
          <p className='text-sm text-gray-500'>
            Our support team responds within one business day
          </p>
        </div>

        <div>
          <h3 className='font-semibold'>Secure Orders</h3>
          <p className='text-sm text-gray-500'>
            Your payments and personal data are protected
          </p>
        </div>

        <div>
          <h3 className='font-semibold'>Easy Returns</h3>
          <p className='text-sm text-gray-500'>30-day hassle-free returns</p>
        </div>
      </div>
    </Container>
  );
}
