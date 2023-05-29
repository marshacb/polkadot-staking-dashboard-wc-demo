// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useTooltip } from 'contexts/Tooltip';
import { TooltipPosition, TooltipTrigger } from 'library/ListItem/Wrappers';
import { useRef } from 'react';

export const PoolCommission = ({ commission }: { commission: string }) => {
  const { setTooltipPosition, setTooltipMeta, open } = useTooltip();

  const posRef = useRef<HTMLDivElement>(null);

  const tooltipText = 'Pool Commission';

  const toggleTooltip = () => {
    if (!open) {
      setTooltipMeta(tooltipText);
      setTooltipPosition(posRef);
    }
  };

  if (!commission) {
    return null;
  }

  return (
    <div className="label">
      <TooltipTrigger
        className="tooltip-trigger-element"
        data-tooltip-text={tooltipText}
        onMouseMove={() => toggleTooltip()}
      />
      <TooltipPosition ref={posRef} />
      {commission}
    </div>
  );
};
