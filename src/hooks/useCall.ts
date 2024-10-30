import { useState } from 'react';
import { callService } from '../services/CallService';
import { useStore } from '../store/useStore';

export function useCall() {
  const [isCallInitialized, setIsCallInitialized] = useState(false);
  const addCallSession = useStore(state => state.addCallSession);

  const initializeCall = async () => {
    try {
      await callService.initializeCall();
      setIsCallInitialized(true);
    } catch (error) {
      console.error('Failed to initialize call:', error);
    }
  };

  const makeCall = async (phoneNumber: string) => {
    if (!isCallInitialized) {
      await initializeCall();
    }
    
    try {
      const session = await callService.makeCall(phoneNumber);
      addCallSession(session);
      return session;
    } catch (error) {
      console.error('Failed to make call:', error);
      throw error;
    }
  };

  const endCall = () => {
    callService.endCall();
    setIsCallInitialized(false);
  };

  return { makeCall, endCall, isCallInitialized };
}