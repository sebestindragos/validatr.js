/**
 * Class representing a validation rule.
 *
 * @autor Dragos Sebestin
 */
export class Rule <ObjectType, FieldType> {
  private _validations: {(field: FieldType) : void}[] = [];

  /**
   * Class constructor.
   */
  constructor (private _for: string, private _mapper: {(value: ObjectType) : FieldType}) { }

  exec (value: ObjectType) : string[] {
    let field = this._mapper(value);
    let errors = [];

    this._validations.forEach(validation => {
      try {
        validation(field);
      } catch (err) {
        errors.push(err);
      }
    });

    return errors;
  }

  // validations
  // --------------------------------------------------------------------------------

  notEmpty () : Rule<ObjectType, FieldType> {
    this._validations.push(field => {
      if (field === undefined || field === null || (field as any) === '')
        throw `${this._for} field cannot be empty.`;
    });
    return this;
  }

  notEqual (value: any) : Rule<ObjectType, FieldType> {
    this._validations.push(field => {
      if (field === value)
        throw `${this._for} field cannot be equal to ${value}.`;
    });
    return this;
  }

  equal (value: any) : Rule<ObjectType, FieldType> {
    this._validations.push(field => {
      if (field !== value)
        throw `${this._for} field must be equal to ${value}.`;
    });
    return this;
  }

  length (min: number, max?: number) : Rule<ObjectType, FieldType> {
    this._validations.push(field => {
      let fieldString = (field || '').toString();
      if (fieldString.length < min)
        throw `${this._for}'s length must be at least ${min}.`;

      if (max && fieldString.length > max)
        throw `${this._for}'s length must not exceed ${max}.`;
    });
    return this;
  }

  isEmail () : Rule<ObjectType, FieldType> {
    /* tslint:disable */
    const emailRx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    /* tslint:enable */
    this._validations.push(field => {
      if (!emailRx.test(field.toString()))
        throw `${field} is not a valid email address.`;
    });
    return this;
  }
}
