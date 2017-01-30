import {Rule} from './rule';
import {ValidationResult} from './validationResult';

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
  run (value: ObjectType) : ValidationResult {
    let result = new ValidationResult();
    this._rules.forEach(rule => {
      let ruleErrors = rule.exec(value);
      if (ruleErrors.length > 0)
        result.addError(ruleErrors[0].fieldName, ruleErrors[0].message);
    });

    return result;
  }
}
