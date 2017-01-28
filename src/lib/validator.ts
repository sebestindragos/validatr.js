import {Rule} from './rule';

/**
 * Class used for validating input objects.
 *
 * @author Dragos Sebestin
 */
export class ValidatR <ObjectType> {
  private _rules: Rule<ObjectType, any>[] = [];

  /**
   * Constructor.
   */
  constructor () {}

  /**
   * Add a new rule to this validatr object.
   */
  addRule (forField: string, mapper: {(value: ObjectType) : any}) : Rule<ObjectType, any> {
    let rule = new Rule<ObjectType, any>(forField, mapper);
    this._rules.push(rule);
    return rule;
  }

  /**
   * Run all defined rules and return the result.
   */
  run (value: ObjectType) {
    let errors = [];
    this._rules.forEach(rule => {
      let ruleErrors = rule.exec(value);
      if (ruleErrors.length > 0)
        errors = errors.concat(ruleErrors);
    });

    return errors;
  }
}
