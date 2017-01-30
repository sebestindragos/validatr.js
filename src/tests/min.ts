import {expect} from 'chai';
import {Rule} from '../lib/rule';

describe('Rule class', () => {
  describe('#max()', () => {
    let rule = new Rule<number, number>('email', x => x);
    rule.min(10);

    it('should throw for value less than min', () => {
      let errors = rule.exec(9);
      expect(errors.length).to.be.gt(0);
    });

    it('should pass for a value greater than or equal to min', () => {
      let errors = rule.exec(10);
      expect(errors.length).to.be.eq(0);

      errors = rule.exec(11);
      expect(errors.length).to.be.eq(0);
    });
  });
});
