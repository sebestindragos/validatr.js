/**
 * Class used for merging validation errors.
 *
 * @author Dragos Sebestin
 */
export class ValidationResult {
  private _errorFields = {};
  private _hasErrors = false;

  /**
   * Class constructor.
   */
  constructor () {}

  /**
   * Add error for a field.
   */
  addError (fieldName: string, errorMessage: string) {
    this._errorFields[fieldName] = errorMessage;
    this._hasErrors = true;
  }

  /**
   * Get object with field errors.
   */
  getErrors () : Object {
    return this._errorFields;
  }

  /**
   * Check if the validation result has errors.
   */
  isValid () : boolean {
    return !this._hasErrors;
  }
}
