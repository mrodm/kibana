/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import React, { PropsWithChildren } from 'react';
import { EuiPageTemplate, EuiSideNav } from '@elastic/eui';
import { IBasePath } from '@kbn/core/public';
import { PLUGIN_ID } from '../../common';

export interface ExampleLink {
  title: string;
  path: string;
}

interface NavProps {
  exampleLinks: ExampleLink[];
  basePath: IBasePath;
}

const SideNav: React.FC<NavProps> = ({ exampleLinks, basePath }: NavProps) => {
  const navItems = exampleLinks.map((example) => ({
    id: example.path,
    name: example.title,
    'data-test-subj': example.path,
    href: example.path.startsWith('http')
      ? example.path
      : basePath.prepend(`/app/${PLUGIN_ID}${example.path}`),
  }));

  return (
    <EuiSideNav
      items={[
        {
          name: 'Search Examples',
          id: 'home',
          items: [...navItems],
        },
      ]}
    />
  );
};

interface Props {
  exampleLinks: ExampleLink[];
  basePath: IBasePath;
}

export const SearchExamplePage: React.FC<PropsWithChildren<Props>> = ({
  children,
  exampleLinks,
  basePath,
}) => {
  return (
    <EuiPageTemplate offset={0}>
      <EuiPageTemplate.Sidebar>
        <SideNav exampleLinks={exampleLinks} basePath={basePath} />
      </EuiPageTemplate.Sidebar>
      {children}
    </EuiPageTemplate>
  );
};
