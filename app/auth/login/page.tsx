"use client"

import { AuthModal } from '@/components/auth-modal';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const handleClose = () => {
    router.push('/');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <AuthModal isOpen={true} onClose={handleClose} defaultMode="login" />
    </div>
  );
} 