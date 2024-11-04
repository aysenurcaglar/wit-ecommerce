import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../api/axios';
import { setUser } from '../store/actions/clientActions';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';


// Function to convert string to buffer for hashing
const stringToBuffer = (str) => {
  const encoder = new TextEncoder();
  return encoder.encode(str);
};

// Function to convert buffer to hexadecimal string
const bufferToHex = (buffer) => {
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

const getGravatarUrl = async (email) => {
  try {
    const cleanEmail = email.trim().toLowerCase();
    const msgBuffer = stringToBuffer(cleanEmail);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashHex = bufferToHex(hashBuffer);
    return `https://www.gravatar.com/avatar/${hashHex}?d=mp`;
  } catch (error) {
    console.error('Error generating Gravatar URL:', error);
    return `https://www.gravatar.com/avatar/default?d=mp`;
  }
};

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = async (data) => {
    try {
      const response = await api.post('/login', data);
      
      const userData = response.data;
      // Add Gravatar URL to user data
      const gravatarUrl = await getGravatarUrl(data.email);
      const userWithAvatar = { 
        ...userData, 
        avatarUrl: gravatarUrl
      };
      
      dispatch(setUser(userWithAvatar));

      if (rememberMe) {
        localStorage.setItem('authToken', userData.token);
      }

      toast.success(`Welcome, ${userData.name}!`);
      
      const prevPath = localStorage.getItem('prevPath');
      history.push(prevPath || '/');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred during login. Please try again later.';
      toast.error(errorMessage);
      console.error('Login error:', error);
    }
  };

  return (
        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto my-12 max-w-75vw md:max-w-md text-left space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-dark-gray mb-4">
              Login
            </h2>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              {...register('email', { 
                required: 'Email is required', 
                pattern: { 
                  value: /^\S+@\S+$/i, 
                  message: 'Invalid email address' 
                } 
              })}
              className="w-full"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
            <Input
              type="password"
              id="password"
              {...register('password', { 
                required: 'Password is required'
              })}
              className="w-full"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="rememberMe"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked)}
            />
            <Label
              htmlFor="rememberMe"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember me
            </Label>
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Logging in...
            </>
          ) : (
            'Login'
          )}
          </Button>
        </form>
  );
};

export default LoginPage;