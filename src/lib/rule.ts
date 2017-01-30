/**
 * Class representing a validation rule.
 *
 * @autor Dragos Sebestin
 */
export class Rule <ObjectType, FieldType> {
  private _validations: {
    tester: {(field: any) : void}
    message?: string,
  }[] = [];

  /**
   * Class constructor.
   */
  constructor (private _for: string, private _mapper: {(value: ObjectType) : FieldType}) { }

  exec (value: ObjectType) : {
    fieldName: string,
    message: string
  }[] {
    let field = this._mapper(value);
    let errors = [];

    this._validations.forEach(validation => {
      try {
        validation.tester(field);
      } catch (err) {
        errors.push({
          fieldName: this._for,
          message: validation.message || err
        });
      }
    });

    return errors;
  }

  /**
   * Override the default message of the last validation added.
   */
  with (message: string) : Rule<ObjectType, FieldType> {
    if (this._validations.length > 0) {
      this._validations[this._validations.length - 1].message = message;
    }
    return this;
  }

  // validations
  // --------------------------------------------------------------------------------

  notEmpty () : Rule<ObjectType, FieldType> {
    this._validations.push({
      tester: field => {
        if (field === undefined || field === null || (field as any) === '')
          throw `${this._for} field cannot be empty.`;
      }
    });
    return this;
  }

  notEqual (value: any) : Rule<ObjectType, FieldType> {
    this._validations.push({
      tester: field => {
        if (field === value)
          throw `${this._for} field cannot be equal to ${value}.`;
      }
    });
    return this;
  }

  equal (value: any) : Rule<ObjectType, FieldType> {
    this._validations.push({
      tester: field => {
        if (field !== value)
          throw `${this._for} field must be equal to ${value}.`;
      }
    });
    return this;
  }

  length (min: number, max?: number) : Rule<ObjectType, FieldType> {
    this._validations.push({
      tester: field => {
        let fieldString = (field || '').toString();
        if (fieldString.length < min)
          throw `${this._for}'s length must be at least ${min}.`;

        if (max && fieldString.length > max)
          throw `${this._for}'s length must not exceed ${max}.`;
      }
    });
    return this;
  }

  isEmail () : Rule<ObjectType, FieldType> {
    /* tslint:disable */
    const emailRx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    /* tslint:enable */
    this._validations.push({
      tester: field => {
        if (!emailRx.test(field.toString()))
          throw `${field} is not a valid email address.`;
      }
    });
    return this;
  }

  min (value: number) : Rule<ObjectType, FieldType> {
    this._validations.push({
      tester: field => {
        if (typeof field !== 'number')
          throw `${this._for} must be a number.`;
        if (field < value)
          throw `${field} must be at least ${value}.`;
      }
    });
    return this;
  }

  max (value: number) : Rule<ObjectType, FieldType> {
    this._validations.push({
      tester: field => {
        if (typeof field !== 'number')
          throw `${this._for} must be a number.`;
        if (field > value)
          throw `${field} cannot exceed ${value}.`;
      }
    });
    return this;
  }
}
