'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import AccountForm from './AccountForm';

function AccountModal({ isDialogOpen, onChangeDialog, title, operation }) {
  return (
    <Dialog open={isDialogOpen} onOpenChange={onChangeDialog}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className='text-center'>{title}</DialogTitle>
        </DialogHeader>
        <AccountForm operation={operation} setModal={onChangeDialog} />
      </DialogContent>
    </Dialog>
  );
}

export default AccountModal;
