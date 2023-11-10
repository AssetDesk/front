import { Button, DialogContent, DialogFooter, DialogTrigger } from 'ui';

import Image from 'next/image';

type TType = 'deposit' | 'withdraw' | 'borrow' | 'repay';

interface ISuccessStateModalProps {
  type: TType;
  status: 'success' | 'error';
  handleBtn: () => void;
}

export const StatusModal = ({ type, status, handleBtn }: ISuccessStateModalProps) => {
  return (
    <DialogContent className='w-[300px] md:w-[400px]'>
      <div className='pt-12 text-center'>
        <Image
          className='mx-auto mb-6'
          src='/success.svg'
          alt='success img'
          width={109}
          height={119}
        />
        <p className='subtitle1 mb-2'>{status === 'success' ? 'Success!' : 'Oh no!'}</p>
        <p className='subtitle2 text-center text-[#E3E3E3] '>
          {type.charAt(0).toUpperCase() + type.slice(1)}{' '}
          {status === 'success' ? 'success' : 'was failed'}
        </p>
        <DialogFooter className='mt-10'>
          {status === 'success' ? (
            <DialogTrigger asChild>
              <Button onClick={handleBtn} className='w-full md:w-full'>
                Confirm
              </Button>
            </DialogTrigger>
          ) : (
            <Button onClick={handleBtn} className='w-full md:w-full'>
              Try again
            </Button>
          )}
        </DialogFooter>
      </div>
    </DialogContent>
  );
};
