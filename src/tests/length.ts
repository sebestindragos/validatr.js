import {expect} from 'chai';
import {Rule} from '../lib/rule';

/* tslint:disable */
describe('Rule class', () => {
  describe('#length()', () => {
    let rule = new Rule<string, string>('password', x => x);
    rule.length(5, 10);

    it('should throw null or undefined value', () => {
      let errors = rule.exec(null);
      expect(errors.length).to.be.gt(0);

      errors = rule.exec(undefined);
      expect(errors.length).to.be.gt(0);
    });

    it('should throw for a shorter length value', () => {
      let errors = rule.exec('');
      expect(errors.length).to.be.gt(0);

      errors = rule.exec('a');
      expect(errors.length).to.be.gt(0);

      errors = rule.exec('1234');
      expect(errors.length).to.be.gt(0);
    });

    it('should throw for a longer length value', () => {
      let errors = rule.exec('01234567890');
      expect(errors.length).to.be.gt(0);

      errors = rule.exec('012345678901');
      expect(errors.length).to.be.gt(0);
    });

    it('should pass for a value between limits', () => {
      let errors = rule.exec('12345');
      expect(errors.length).to.be.eq(0);

      errors = rule.exec('123456');
      expect(errors.length).to.be.eq(0);

      errors = rule.exec('12345678');
      expect(errors.length).to.be.eq(0);

      errors = rule.exec('1234567890');
      expect(errors.length).to.be.eq(0);
    });
  });
});
