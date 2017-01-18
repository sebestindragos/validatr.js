import {expect} from 'chai';
import {Rule} from '../lib/rule';

/* tslint:disable */
describe('Rule class', () => {
  describe('#notEmpty()', () => {
    let rule = new Rule<string, string>('email', x => x);
    rule.notEmpty();

    it ('should throw for an undefined value', () => {
      let errors = rule.exec(undefined);
      expect(errors.length).to.be.gt(0);
    });

    it ('should throw for a null value', () => {
      let errors = rule.exec(null);
      expect(errors.length).to.be.gt(0);
    });

    it ('should throw for an empty string value', () => {
      let errors = rule.exec('');
      expect(errors.length).to.be.gt(0);
    });

    it ('should pass for a value of 0 as number', () => {
      let rule = new Rule<number, number>('email', x => x);
      rule.notEmpty();
      let errors = rule.exec(0);
      
      expect(errors.length).to.be.eq(0);
    });

    it ('should pass for a not empty value', () => {
      let errors = rule.exec('m');
      expect(errors.length).to.be.eq(0);

      errors = rule.exec('me@example.com');
      expect(errors.length).to.be.eq(0);
    });
  });

  describe('#notEqual()', () => {
    it ('should throw for a matching string value', () => {
      let rule = new Rule<string, string>('email', x => x);
      rule.notEqual('email');
      let errors = rule.exec('email');
      expect(errors.length).to.be.gt(0);
    });
    it ('should pass for a not matching string value', () => {
      let rule = new Rule<string, string>('email', x => x);
      rule.notEqual('email');
      let errors = rule.exec('other');
      expect(errors.length).to.be.eq(0);
    });

    it ('should throw for a matching number value', () => {
      let rule = new Rule<number, number>('email', x => x);
      rule.notEqual(7);
      let errors = rule.exec(7);
      expect(errors.length).to.be.gt(0);

      rule = new Rule<number, number>('email', x => x);
      rule.notEqual(7.87);
      errors = rule.exec(7.87);
      expect(errors.length).to.be.gt(0);
    });
    it ('should pass for a not matching number value', () => {
      let rule = new Rule<number, number>('email', x => x);
      rule.notEqual(7);
      let errors = rule.exec(8);
      expect(errors.length).to.be.eq(0);

      rule = new Rule<number, number>('email', x => x);
      rule.notEqual(7.87);
      errors = rule.exec(8.78);
      expect(errors.length).to.be.eq(0);
    });

    it ('should throw for a matching boolean value', () => {
      let rule = new Rule<boolean, boolean>('email', x => x);
      rule.notEqual(true);
      let errors = rule.exec(true);

      expect(errors.length).to.be.gt(0);
    });
    it ('should pass for a not matching boolean value', () => {
      let rule = new Rule<boolean, boolean>('email', x => x);
      rule.notEqual(true);
      let errors = rule.exec(false);

      expect(errors.length).to.be.eq(0);
    });

    it ('should always throw for object values', () => {
      let rule = new Rule<Object, Object>('email', x => x);
      rule.notEqual({email: 'asd'});
      let errors = rule.exec({email: 'fgh'});
      expect(errors.length).to.be.eq(0);

      errors = rule.exec({email: 'asd'});
      expect(errors.length).to.be.eq(0);
    });
  });

  describe('#equal()', () => {
    it ('should pass for a matching string value', () => {
      let rule = new Rule<string, string>('email', x => x);
      rule.equal('email');
      let errors = rule.exec('email');
      expect(errors.length).to.be.eq(0);
    });
    it ('should throw for a not matching string value', () => {
      let rule = new Rule<string, string>('email', x => x);
      rule.equal('email');
      let errors = rule.exec('other');
      expect(errors.length).to.be.gt(0);
    });

    it ('should pass for a matching number value', () => {
      let rule = new Rule<number, number>('email', x => x);
      rule.equal(7);
      let errors = rule.exec(7);
      expect(errors.length).to.be.eq(0);

      rule = new Rule<number, number>('email', x => x);
      rule.equal(7.87);
      errors = rule.exec(7.87);
      expect(errors.length).to.be.eq(0);
    });
    it ('should throw for a not matching number value', () => {
      let rule = new Rule<number, number>('email', x => x);
      rule.equal(7);
      let errors = rule.exec(8);
      expect(errors.length).to.be.gt(0);

      rule = new Rule<number, number>('email', x => x);
      rule.equal(7.87);
      errors = rule.exec(8.78);
      expect(errors.length).to.be.gt(0);
    });

    it ('should pass for a matching boolean value', () => {
      let rule = new Rule<boolean, boolean>('email', x => x);
      rule.equal(true);
      let errors = rule.exec(true);

      expect(errors.length).to.be.eq(0);
    });
    it ('should throw for a not matching boolean value', () => {
      let rule = new Rule<boolean, boolean>('email', x => x);
      rule.equal(true);
      let errors = rule.exec(false);

      expect(errors.length).to.be.gt(0);
    });

    it ('should always throw for object values', () => {
      let rule = new Rule<Object, Object>('email', x => x);
      rule.equal({email: 'asd'});
      let errors = rule.exec({email: 'fgh'});
      expect(errors.length).to.be.gt(0);

      errors = rule.exec({email: 'asd'});
      expect(errors.length).to.be.gt(0);
    });
  });
});
