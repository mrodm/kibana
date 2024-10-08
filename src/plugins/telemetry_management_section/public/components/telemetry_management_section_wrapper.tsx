/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import React, { lazy, Suspense } from 'react';
import { EuiLoadingSpinner } from '@elastic/eui';
import type { TelemetryPluginSetup } from '@kbn/telemetry-plugin/public';
import { DocLinksStart } from '@kbn/core/public';
import { RegistryComponentProps } from '@kbn/management-settings-section-registry';
import type TelemetryManagementSection from './telemetry_management_section';

export type TelemetryManagementSectionWrapperProps = Omit<
  TelemetryManagementSection['props'],
  'telemetryService' | 'showAppliesSettingMessage' | 'docLinks'
>;

const TelemetryManagementSectionComponent = lazy(() => import('./telemetry_management_section'));

export function telemetryManagementSectionWrapper(
  telemetryService: TelemetryPluginSetup['telemetryService'],
  docLinks: DocLinksStart['links']
) {
  const TelemetryManagementSectionWrapper = ({
    enableSaving,
    ...props
  }: RegistryComponentProps) => (
    <Suspense fallback={<EuiLoadingSpinner />}>
      <TelemetryManagementSectionComponent
        showAppliesSettingMessage={true}
        telemetryService={telemetryService}
        docLinks={docLinks}
        enableSaving={enableSaving.global === true}
        {...props}
      />
    </Suspense>
  );

  return TelemetryManagementSectionWrapper;
}
