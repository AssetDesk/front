import {
  Account,
  BASE_FEE,
  Contract,
  SorobanRpc,
  TimeoutInfinite,
  Transaction,
  TransactionBuilder,
  xdr,
} from 'stellar-sdk';

interface ContractTransaction {
  networkPassphrase: string;
  source: Account;
  contractAddress: string;
  method: string;
  args: xdr.ScVal[] | undefined;
  fee: string;
}

export const getTxBuilder = (
  source: Account,
  fee: string,
  networkPassphrase: string,
): TransactionBuilder => {
  return new TransactionBuilder(source, {
    fee,
    networkPassphrase,
  });
};

export function contractTransaction({
  networkPassphrase,
  source,
  contractAddress,
  method,
  args,
  fee,
}: ContractTransaction): Transaction {
  const myParams: xdr.ScVal[] = args ?? [];
  const contract = new Contract(contractAddress);
  const txBuilder = getTxBuilder(source, fee, networkPassphrase);

  return txBuilder
    .addOperation(contract.call(method, ...myParams))
    .setTimeout(TimeoutInfinite)
    .build();
}

export async function fetchContractValue({
  server,
  networkPassphrase,
  contractAddress,
  method,
  args,
  source,
}: ContractTransaction & {
  server: SorobanRpc.Server;
}): Promise<SorobanRpc.Api.SimulateTransactionSuccessResponse> {
  const txn = contractTransaction({
    source,
    networkPassphrase,
    contractAddress,
    method,
    args,
    fee: BASE_FEE,
  });

  const simulated: SorobanRpc.Api.SimulateTransactionResponse =
    await server.simulateTransaction(txn);

  if (SorobanRpc.Api.isSimulationError(simulated)) {
    throw new Error(simulated.error);
  } else if (!simulated.result) {
    throw new Error(`invalid simulation: no result in ${JSON.stringify(simulated)}`);
  }

  return simulated;
}
