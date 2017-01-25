import {expect} from 'chai';
import {Rule} from '../lib/rule';

describe('Rule class', () => {
  describe('#isEmail()', () => {
    let rule = new Rule<string, string>('email', x => x);
    rule.isEmail();

    it('should throw for an invalid email value', () => {
      let errors = rule.exec('');
      expect(errors.length).to.be.gt(0);

      errors = rule.exec('a');
      expect(errors.length).to.be.gt(0);

      errors = rule.exec('a@');
      expect(errors.length).to.be.gt(0);

      errors = rule.exec('a@e');
      expect(errors.length).to.be.gt(0);

      errors = rule.exec('a@e.');
      expect(errors.length).to.be.gt(0);

      errors = rule.exec('a@email.');
      expect(errors.length).to.be.gt(0);

      errors = rule.exec('a@email.c');
      expect(errors.length).to.be.gt(0);
    });

    it('should pass for a valid email value', () => {
      let errors = rule.exec('me@e.co');
      expect(errors.length).to.be.eq(0);

      errors = rule.exec('m@email.co');
      expect(errors.length).to.be.eq(0);

      errors = rule.exec('m@email.com');
      expect(errors.length).to.be.eq(0);

      errors = rule.exec('m@email.example');
      expect(errors.length).to.be.eq(0);
    });
  });
});
