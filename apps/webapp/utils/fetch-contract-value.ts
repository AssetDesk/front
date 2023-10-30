import {
  Account,
  Contract,
  Server,
  SorobanRpc,
  TimeoutInfinite,
  Transaction,
  TransactionBuilder,
  xdr,
} from 'soroban-client';

interface ContractTransaction {
  networkPassphrase: string;
  source: Account;
  contractAddress: string;
  method: string;
  args: xdr.ScVal[] | undefined;
}

export function contractTransaction({
  networkPassphrase,
  source,
  contractAddress,
  method,
  args,
}: ContractTransaction): Transaction {
  const myParams: xdr.ScVal[] = args ?? [];
  const contract = new Contract(contractAddress);
  return new TransactionBuilder(source, {
    fee: '100',
    networkPassphrase,
  })
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
}: ContractTransaction & { server: Server }): Promise<xdr.ScVal> {
  const txn = contractTransaction({
    source,
    networkPassphrase,
    contractAddress,
    method,
    args,
  });

  const simulated: SorobanRpc.SimulateTransactionResponse = await server.simulateTransaction(txn);
  if (SorobanRpc.isSimulationError(simulated)) {
    throw new Error(simulated.error);
  } else if (!simulated.result) {
    throw new Error(`invalid simulation: no result in ${JSON.stringify(simulated)}`);
  }

  return simulated.result.retval;
}
