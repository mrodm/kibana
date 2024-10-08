/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import { UiSettingsClientCommon } from './ui_settings_client_common';
import { UiSettingsServiceOptions } from '../types';
import { SettingNotRegisteredError } from '../ui_settings_errors';

/**
 * Global UiSettingsClient
 */
export class UiSettingsGlobalClient extends UiSettingsClientCommon {
  constructor(options: UiSettingsServiceOptions) {
    super(options);
  }

  async setMany(
    changes: Record<string, any>,
    options: { validateKeys?: boolean } = { validateKeys: true }
  ) {
    const registeredSettings = super.getRegistered();
    if (options.validateKeys) {
      Object.keys(changes).forEach((key) => {
        if (!registeredSettings[key]) {
          throw new SettingNotRegisteredError(key);
        }
      });
    }

    return super.setMany(changes, options);
  }

  async set(key: string, value: any) {
    const registeredSettings = super.getRegistered();
    if (!registeredSettings[key]) {
      throw new SettingNotRegisteredError(key);
    }
    await super.set(key, value);
  }
}
