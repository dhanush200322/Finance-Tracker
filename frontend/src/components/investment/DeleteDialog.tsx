import React from 'react';
import { Button } from '../ui/Button';

export const DeleteDialog: React.FC<{ onClose: () => void, onConfirm: () => void, isLoading?: boolean }> = ({ onClose, onConfirm, isLoading }) => (
  <div className="space-y-4">
    <p className="text-gray-600">Are you sure you want to delete this investment? This action cannot be undone.</p>
    <div className="flex justify-end gap-3 pt-4">
      <Button variant="ghost" onClick={onClose} disabled={isLoading}>Cancel</Button>
      <Button variant="danger" onClick={onConfirm} isLoading={isLoading}>Yes, Delete</Button>
    </div>
  </div>
);
