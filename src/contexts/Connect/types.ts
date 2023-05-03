// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { SignClient } from '@walletconnect/sign-client/dist/types/client';
import type { SessionTypes } from '@walletconnect/types';
import type {
  ExtensionAccount,
  ExtensionInjected,
} from 'contexts/Extensions/types';
import type { MaybeAccount } from 'types';

export interface ConnectContextInterface {
  formatAccountSs58: (a: string) => string | null;
  connectExtensionAccounts: (e: ExtensionInjected) => Promise<void>;
  connectWalletConnectExtensionAccounts: (id: string) => Promise<void>;
  getAccount: (account: MaybeAccount) => ExtensionAccount | null;
  getWalletConnectClient: () => SignClient | null;
  getWalletConnectSession: () => SessionTypes.Struct | null;
  getWalletConnectChainInfo: () => string | null;
  connectToAccount: (a: ImportedAccount | null) => void;
  disconnectFromAccount: () => void;
  addExternalAccount: (a: string, addedBy: string) => void;
  getActiveAccount: () => string | null;
  accountHasSigner: (a: MaybeAccount) => boolean;
  requiresManualSign: (a: MaybeAccount) => boolean;
  isReadOnlyAccount: (a: MaybeAccount) => boolean;
  addToAccounts: (a: Array<ImportedAccount>) => void;
  forgetAccounts: (a: Array<ImportedAccount>) => void;
  setActiveProxy: (p: MaybeAccount, l?: boolean) => void;
  accounts: Array<ExtensionAccount>;
  activeAccount: MaybeAccount;
  activeProxy: MaybeAccount;
  activeAccountMeta: ImportedAccount | null;
}

export type ImportedAccount =
  | ExtensionAccount
  | ExternalAccount
  | LedgerAccount;

export interface ExternalAccount {
  address: string;
  network: string;
  name: string;
  source: string;
  addedBy: string;
}

export interface LedgerAccount {
  address: string;
  network: string;
  name: string;
  source: string;
  index: number;
}

export interface HandleImportExtension {
  newAccounts: Array<ExtensionAccount>;
  meta: {
    removedActiveAccount: MaybeAccount;
  };
}
