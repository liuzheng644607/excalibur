
import * as React from 'react';
import {create} from 'react-test-renderer';
import {Default} from './index';

describe('Button', () => {

  describe('props', () => {

    it('Default', () => {
      const node = create(
        <Default/>,
      );
      const tree = node.toJSON();
      expect(tree).toMatchSnapshot();

    });

  });
});
