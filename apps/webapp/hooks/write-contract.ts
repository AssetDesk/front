import {
  Account,
  BASE_FEE,
  Contract,
  Server,
  SorobanRpc,
  TimeoutInfinite,
  TransactionBuilder,
  xdr,
} from 'soroban-client';
import { ChainName } from '../types/chain';
import { sorobanRPC } from '../utils/rpc';
import { useSorobanReact } from '@soroban-react/core';
import { WalletChain } from '@soroban-react/types';
import { signTransaction } from '@stellar/freighter-api';
import { SendTxStatus } from '../types/transaction';
import { ContractMethods } from '../types/contract';
import { fetchContractValue, getTxBuilder } from '../utils/fetch-contract-value';
import { useState } from 'react';
import BigNumber from 'bignumber.js';

const getTxBuildResult = (
  account: Account,
  contractAddress: string,
  funcName: string,
  args: xdr.ScVal[],
  fee: string,
  activeChain: WalletChain,
) => {
  const contract = new Contract(contractAddress);
  const source = new Account(
    account.accountId(),
    // https://github.com/stellar/js-stellar-base/blob/master/docs/reference/building-transactions.md#sequence-numbers
    BigNumber(account.sequenceNumber()).minus(BigNumber(1)).toFixed(),
  );

  const txBuilder = getTxBuilder(source, fee, activeChain.networkPassphrase);

  const txBuild = txBuilder
    .addOperation(contract.call(funcName, ...args))
    .setTimeout(TimeoutInfinite)
    .build();

  return txBuild;
};

// Build and submits a transaction to the Soroban RPC
// Polls for non-pending state, returns result after status is updated
export const submitTx = async (signedXDR: string, networkPassphrase: string, server: Server) => {
  const tx = TransactionBuilder.fromXDR(signedXDR, networkPassphrase);

  const sendResponse = await server.sendTransaction(tx);

  if (sendResponse.errorResult)
    throw new Error(`Unable to submit transaction - ${JSON.stringify(sendResponse.errorResult)}`);

  if (sendResponse.status === SendTxStatus.PENDING) {
    let txResponse = await server.getTransaction(sendResponse.hash);

    // Poll this until the status is not "NOT_FOUND"
    while (txResponse.status === SorobanRpc.GetTransactionStatus.NOT_FOUND) {
      // See if the transaction is complete
      // eslint-disable-next-line no-await-in-loop
      txResponse = await server.getTransaction(sendResponse.hash);
      // Wait a second
      // eslint-disable-next-line no-await-in-loop
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    if (txResponse.status === SorobanRpc.GetTransactionStatus.SUCCESS) {
      return txResponse.resultXdr.toXDR('base64');
    }

    throw new Error(`Unabled to submit transaction, status: ${sendResponse.status}`);
  }
  return null;
};

export const useWriteContract = () => {
  const { activeChain, address } = useSorobanReact();
  const [isError, setIsError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);

  const write = async (contractAddress: string, method: ContractMethods, args: xdr.ScVal[]) => {
    setLoading(true);
    setIsError(false);
    setSuccess(false);
    setError(null);
    try {
      if (!activeChain || !address) return;

      const server = new Server(sorobanRPC[activeChain.name as ChainName], {
        allowHttp: true,
      });

      const account = await server.getAccount(address);

      const source = new Account(address, account.sequenceNumber());

      const simulateResult = await fetchContractValue({
        server,
        networkPassphrase: activeChain.networkPassphrase,
        contractAddress,
        method,
        args,
        source,
        fee: BASE_FEE,
      });

      const buildResult = getTxBuildResult(
        source,
        contractAddress,
        method,
        args,
        simulateResult.minResourceFee,
        activeChain,
      );

      const prepareTx = await server.prepareTransaction(buildResult);

      const signedXDR = await signTransaction(prepareTx.toXDR(), {
        network: activeChain.name,
        networkPassphrase: activeChain.networkPassphrase,
        accountToSign: address,
      });

      await submitTx(signedXDR, activeChain.networkPassphrase, server);
      setSuccess(true);
      setLoading(false);
    } catch (error) {
      console.log(error);

      const err = error as Error;
      setError(JSON.stringify(err.message));

      setIsError(true);
      setLoading(false);
    }
  };

  return {
    isError,
    isLoading,
    isSuccess,
    error,
    setSuccess,
    setIsError,
    write,
  };
};
