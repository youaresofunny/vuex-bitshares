/**
 * Is connection ready
 */
export function isReady(state) {
  return (state.rpcStatus === 'open' || state.rpcStatus === 'realopen') && state.wsConnected;
}

