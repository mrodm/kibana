/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { FtrProviderContext } from '../../../ftr_provider_context';
import { RoleCredentials } from '../../../../shared/services';

export default function ({ getService }: FtrProviderContext) {
  const svlCommonApi = getService('svlCommonApi');
  const svlUserManager = getService('svlUserManager');
  const supertestWithoutAuth = getService('supertestWithoutAuth');
  let roleAuthc: RoleCredentials;

  describe('security/role_mappings', function () {
    before(async () => {
      roleAuthc = await svlUserManager.createM2mApiKeyWithRoleScope('admin');
    });
    after(async () => {
      await svlUserManager.invalidateM2mApiKeyWithRoleScope(roleAuthc);
    });
    describe('route access', () => {
      describe('disabled', () => {
        it('create/update roleAuthc mapping', async () => {
          const { body, status } = await supertestWithoutAuth
            .post('/internal/security/role_mapping/test')
            .set(svlCommonApi.getInternalRequestHeader())
            .set(roleAuthc.apiKeyHeader);
          svlCommonApi.assertApiNotFound(body, status);
        });

        it('get roleAuthc mapping', async () => {
          const { body, status } = await supertestWithoutAuth
            .get('/internal/security/role_mapping/test')
            .set(svlCommonApi.getInternalRequestHeader())
            .set(roleAuthc.apiKeyHeader);
          svlCommonApi.assertApiNotFound(body, status);
        });

        it('get all roleAuthc mappings', async () => {
          const { body, status } = await supertestWithoutAuth
            .get('/internal/security/role_mapping')
            .set(svlCommonApi.getInternalRequestHeader())
            .set(roleAuthc.apiKeyHeader);
          svlCommonApi.assertApiNotFound(body, status);
        });

        it('delete roleAuthc mapping', async () => {
          // this test works because the message for a missing endpoint is different from a missing roleAuthc mapping
          const { body, status } = await supertestWithoutAuth
            .delete('/internal/security/role_mapping/test')
            .set(svlCommonApi.getInternalRequestHeader())
            .set(roleAuthc.apiKeyHeader);
          svlCommonApi.assertApiNotFound(body, status);
        });
      });
    });
  });
}
