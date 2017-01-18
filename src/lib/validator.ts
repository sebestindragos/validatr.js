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
}
