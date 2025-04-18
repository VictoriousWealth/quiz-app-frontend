import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { decodeToken } from '../utils/authUtils';
import { Toast, ToastContainer } from 'react-bootstrap';

const SessionWatcher = () => {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    navigate('/login');
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) return;

    const expiryTime = decoded.exp * 1000;
    const now = Date.now();
    const timeUntilExpiry = expiryTime - now;
    const toastOffset = 10 * 1000;

    if (timeUntilExpiry <= 0) {
      logout();
      return;
    }

    const toastTimer = setTimeout(() => setShowToast(true), timeUntilExpiry - toastOffset);
    const logoutTimer = setTimeout(() => logout(), timeUntilExpiry);

    return () => {
      clearTimeout(toastTimer);
      clearTimeout(logoutTimer);
    };
  }, [logout]);

  return (
    <ToastContainer position="top-center" className="p-3">
      <Toast onClose={() => setShowToast(false)} show={showToast} bg="warning" delay={4000} autohide>
        <Toast.Header>
          <strong className="me-auto">Session Expiring</strong>
        </Toast.Header>
        <Toast.Body>Your session is ending. You’ll be logged out shortly.</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default SessionWatcher;
