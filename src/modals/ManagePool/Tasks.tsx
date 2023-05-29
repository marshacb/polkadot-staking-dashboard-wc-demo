// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useApi } from 'contexts/Api';
import { useConnect } from 'contexts/Connect';
import { useActivePools } from 'contexts/Pools/ActivePools';
import { useTransferOptions } from 'contexts/TransferOptions';
import { Warning } from 'library/Form/Warning';
import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ContentWrapper } from './Wrappers';

export const Tasks = forwardRef(({ setSection, setTask }: any, ref: any) => {
  const { t } = useTranslation('modals');
  const { activeAccount } = useConnect();
  const { name } = useApi().network;
  const { selectedActivePool, isOwner, isStateToggler, isMember, isDepositor } =
    useActivePools();
  const { getTransferOptions } = useTransferOptions();
  const { active } = getTransferOptions(activeAccount).pool;

  const poolLocked = selectedActivePool?.bondedPool?.state === 'Blocked';
  const poolDestroying = selectedActivePool?.bondedPool?.state === 'Destroying';

  return (
    <ContentWrapper>
      <div className="padding">
        {poolDestroying && <Warning text={t('beingDestroyed')} />}

        <div
          className="items"
          ref={ref}
          style={{ paddingBottom: '1.5rem', paddingTop: '1.5rem' }}
        >
          {['kusama', 'westend'].includes(name) && (
            <>
              {isOwner() && (
                <button
                  type="button"
                  className="action-button"
                  onClick={() => {
                    setSection(1);
                    setTask('manage_commission');
                  }}
                >
                  <div>
                    <h3>{t('manageCommission')}</h3>
                    <p>{t('updatePoolCommission')}</p>
                  </div>
                  <div>
                    <FontAwesomeIcon
                      transform="shrink-2"
                      icon={faChevronRight}
                      className="arrow"
                    />
                  </div>
                </button>
              )}
              <button
                type="button"
                className="action-button"
                onClick={() => {
                  setSection(1);
                  setTask('set_claim_permission');
                }}
              >
                <div>
                  <h3>{t('updateClaimPermission')}</h3>
                  <p>{t('updateWhoClaimRewards')}</p>
                </div>
                <div>
                  <FontAwesomeIcon
                    transform="shrink-2"
                    icon={faChevronRight}
                    className="arrow"
                  />
                </div>
              </button>
            </>
          )}
          {isOwner() && (
            <button
              type="button"
              className="action-button"
              disabled={poolDestroying}
              onClick={() => {
                setSection(1);
                setTask('set_pool_metadata');
              }}
            >
              <div>
                <h3>{t('renamePool')}</h3>
                <p>{t('updateName')}</p>
              </div>
              <div>
                <FontAwesomeIcon
                  transform="shrink-2"
                  icon={faChevronRight}
                  className="arrow"
                />
              </div>
            </button>
          )}
          {(isOwner() || isStateToggler()) && (
            <>
              {poolLocked ? (
                <button
                  type="button"
                  className="action-button"
                  disabled={poolDestroying}
                  onClick={() => {
                    setSection(1);
                    setTask('unlock_pool');
                  }}
                >
                  <div>
                    <h3>{t('unlockPool')}</h3>
                    <p>{t('allowToJoin')}</p>
                  </div>
                  <div>
                    <FontAwesomeIcon
                      transform="shrink-2"
                      icon={faChevronRight}
                      className="arrow"
                    />
                  </div>
                </button>
              ) : (
                <button
                  type="button"
                  className="action-button"
                  disabled={poolDestroying}
                  onClick={() => {
                    setSection(1);
                    setTask('lock_pool');
                  }}
                >
                  <div>
                    <h3>{t('lockPool')}</h3>
                    <p>{t('stopJoiningPool')}</p>
                  </div>
                  <div>
                    <FontAwesomeIcon
                      transform="shrink-2"
                      icon={faChevronRight}
                      className="arrow"
                    />
                  </div>
                </button>
              )}
              <button
                type="button"
                className="action-button"
                disabled={poolDestroying}
                onClick={() => {
                  setSection(1);
                  setTask('destroy_pool');
                }}
              >
                <div>
                  <h3>{t('destroyPool')}</h3>
                  <p>{t('changeToDestroy')}</p>
                </div>
                <div>
                  <FontAwesomeIcon
                    transform="shrink-2"
                    icon={faChevronRight}
                    className="arrow"
                  />
                </div>
              </button>
            </>
          )}
          {isMember() && !isDepositor() && active?.isGreaterThan(0) && (
            <button
              type="button"
              className="action-button"
              onClick={() => {
                setSection(1);
                setTask('leave_pool');
              }}
            >
              <div>
                <h3>{t('leavePool')}</h3>
                <p>{t('unbondFundsLeavePool')}</p>
              </div>
              <div>
                <FontAwesomeIcon
                  transform="shrink-2"
                  icon={faChevronRight}
                  className="arrow"
                />
              </div>
            </button>
          )}
        </div>
      </div>
    </ContentWrapper>
  );
});
