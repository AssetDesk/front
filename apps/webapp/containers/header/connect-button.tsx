import { Button } from 'ui';
import { useAccount } from '../../hooks';
import { MouseEventHandler } from 'react';

export const ConnectButton = () => {
  const { user, loading, login } = useAccount();

  return (
    <Button onClick={login as MouseEventHandler<HTMLButtonElement>} disabled={loading}>
      {loading ? '' : !user ? 'Connect' : user.displayName}
    </Button>
  );
};
