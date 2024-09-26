"use client";
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import api from '@/utils/axios';  // Your axios instance

const VerifyEmail = () => {
  const searchParams = useSearchParams();
  const [message, setMessage] = useState('');
  const hasVerified = useRef(false);  // Track if the verification has already happened
  const router=useRouter();

  useEffect(() => {
    const verifyEmail = async () => {
      const code = searchParams.get('code');  // Get 'code' directly from searchParams

      if (!code) {
        setMessage('Verification code is missing.');
        return;
      }

      // Prevent the function from being called multiple times
      if (hasVerified.current) return;
      hasVerified.current = true;

      try {
        const response = await api.get(`/auth/verify-email?code=${code}`);

        if (response.status === 200) {
          setMessage(response.data.message);
          router.push("/login");

        } else {
          setMessage(response.data.message || 'Verification failed.');
        }
      } catch (error: any) {
        setMessage(
          error.response?.data?.message || 'An error occurred while verifying your email.'
        );
      }
    };

    verifyEmail();
  }, [searchParams]);

  return (
    <div>
      <h1>Email Verification</h1>
      <p>{message}</p>
    </div>
  );
};

export default VerifyEmail;
