// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { isSupportedProxy } from 'config/proxies';
import { useConnect } from 'contexts/Connect';
import type { ImportedAccount } from 'contexts/Connect/types';
import type { ProxyDelegate } from 'contexts/Proxies/type';
import { AccountButton } from './Account';
import { AccountGroupWrapper } from './Wrappers';
import type { DelegatesProps } from './types';

export const Delegates = ({ delegates, delegator }: DelegatesProps) => {
  const { accounts } = useConnect();

  // Remove delegates that are not imported accounts. Default to empty array if there are no
  // delegates for this address.
  const delegatesList =
    delegates?.delegates.filter(
      (d: ProxyDelegate) =>
        accounts.find((a: ImportedAccount) => a.address === d.delegate) !==
          undefined && isSupportedProxy(d.proxyType)
    ) || [];

  return (
    <>
      {delegatesList.length ? (
        <AccountGroupWrapper>
          {delegatesList.map(({ delegate }: ProxyDelegate) => {
            return (
              <AccountButton
                key={`_del_${delegator}_${delegate}`}
                address={delegate}
                delegator={delegator}
              />
            );
          })}
        </AccountGroupWrapper>
      ) : null}
    </>
  );
};
