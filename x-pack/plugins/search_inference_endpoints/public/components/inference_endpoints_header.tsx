/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { EuiPageTemplate, EuiLink } from '@elastic/eui';
import React from 'react';
import * as i18n from '../../common/translations';
import { docLinks } from '../../common/doc_links';
import { useTrainedModelPageUrl } from '../hooks/use_trained_model_page_url';

export const InferenceEndpointsHeader: React.FC = () => {
  const trainedModelPageUrl = useTrainedModelPageUrl();

  return (
    <EuiPageTemplate.Header
      data-test-subj="allInferenceEndpointsPage"
      pageTitle={i18n.INFERENCE_ENDPOINT_LABEL}
      description={i18n.MANAGE_INFERENCE_ENDPOINTS_LABEL}
      bottomBorder={true}
      rightSideItems={[
        <EuiLink
          href={docLinks.createInferenceEndpoint}
          target="_blank"
          data-test-subj="api-documentation"
        >
          {i18n.API_DOCUMENTATION_LINK}
        </EuiLink>,
        <EuiLink href={trainedModelPageUrl} target="_blank" data-test-subj="view-your-models">
          {i18n.VIEW_YOUR_MODELS_LINK}
        </EuiLink>,
      ]}
    />
  );
};
