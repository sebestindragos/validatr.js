import {expect} from 'chai';
import {Rule} from '../lib/rule';

describe('Rule class', () => {
  describe('#must()', () => {
    it('should throw for predicate that throws an error', () => {
      let rule = new Rule<string, string>('email', x => x);
      rule.must((email: string) => {
        throw `${email} is invalid.`;
      });
      let errors = rule.exec('asd@example.com');
      expect(errors.length).to.be.gt(0);
    });

    it('should pass for a predicate that does not throw an error', () => {
      let rule = new Rule<string, string>('email', x => x);
      rule.must((email: string) => {
        email;
      });
      let errors = rule.exec('asd@example.com');
      expect(errors.length).to.be.eq(0);
    });
  });
});
