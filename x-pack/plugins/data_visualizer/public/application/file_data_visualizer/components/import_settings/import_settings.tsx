/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { i18n } from '@kbn/i18n';
import type { FC } from 'react';
import React from 'react';

import { EuiTabbedContent, EuiSpacer } from '@elastic/eui';

import type { FindFileStructureResponse } from '@kbn/file-upload-plugin/common';
import { SimpleSettings } from './simple';
import { AdvancedSettings } from './advanced';
import type { CombinedField } from '../../../common/components/combined_fields';
import { useDataVisualizerKibana } from '../../../kibana_context';

interface Props {
  index: string;
  dataView: string;
  initialized: boolean;
  onIndexChange(index: string): void;
  createDataView: boolean;
  onCreateDataViewChange(): void;
  onDataViewChange(): void;
  indexSettingsString: string;
  mappingsString: string;
  pipelineString: string;
  onIndexSettingsStringChange(): void;
  onMappingsStringChange(mappings: string): void;
  onPipelineStringChange(pipeline: string): void;
  indexNameError: string;
  dataViewNameError: string;
  combinedFields: CombinedField[];
  onCombinedFieldsChange(combinedFields: CombinedField[]): void;
  results: FindFileStructureResponse;
}

export const ImportSettings: FC<Props> = ({
  index,
  dataView,
  initialized,
  onIndexChange,
  createDataView,
  onCreateDataViewChange,
  onDataViewChange,
  indexSettingsString,
  mappingsString,
  pipelineString,
  onIndexSettingsStringChange,
  onMappingsStringChange,
  onPipelineStringChange,
  indexNameError,
  dataViewNameError,
  combinedFields,
  onCombinedFieldsChange,
  results,
}) => {
  const {
    services: {
      application: { capabilities },
    },
  } = useDataVisualizerKibana();

  const canCreateDataView =
    capabilities.savedObjectsManagement.edit === true || capabilities.indexPatterns.save === true;

  const tabs = [
    {
      id: 'simple-settings',
      name: i18n.translate('xpack.dataVisualizer.file.importSettings.simpleTabName', {
        defaultMessage: 'Simple',
      }),
      content: (
        <>
          <EuiSpacer size="m" />

          <SimpleSettings
            index={index}
            initialized={initialized}
            onIndexChange={onIndexChange}
            createDataView={createDataView}
            onCreateDataViewChange={onCreateDataViewChange}
            indexNameError={indexNameError}
            combinedFields={combinedFields}
            canCreateDataView={canCreateDataView}
            results={results}
          />
        </>
      ),
    },
    {
      id: 'advanced-settings',
      name: i18n.translate('xpack.dataVisualizer.file.importSettings.advancedTabName', {
        defaultMessage: 'Advanced',
      }),
      content: (
        <>
          <EuiSpacer size="m" />

          <AdvancedSettings
            index={index}
            dataView={dataView}
            initialized={initialized}
            onIndexChange={onIndexChange}
            createDataView={createDataView}
            onCreateDataViewChange={onCreateDataViewChange}
            onDataViewChange={onDataViewChange}
            indexSettingsString={indexSettingsString}
            mappingsString={mappingsString}
            pipelineString={pipelineString}
            onIndexSettingsStringChange={onIndexSettingsStringChange}
            onMappingsStringChange={onMappingsStringChange}
            onPipelineStringChange={onPipelineStringChange}
            indexNameError={indexNameError}
            dataViewNameError={dataViewNameError}
            combinedFields={combinedFields}
            onCombinedFieldsChange={onCombinedFieldsChange}
            results={results}
            canCreateDataView={canCreateDataView}
          />
        </>
      ),
    },
  ];
  return (
    <>
      <EuiTabbedContent tabs={tabs} initialSelectedTab={tabs[0]} onTabClick={() => {}} />
    </>
  );
};
