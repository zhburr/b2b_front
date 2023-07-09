import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  constructor() {}

  /**
   * This method verifies all the fields that are required in a form.
   *
   * @param fields
   * format of fields = [
   * [variable name present in body],[label of that fields]
   * ]
   * @param body
   * @returns
   */
  validateRequired(fields: any, body: any) {
    return new Promise((resolve, reject) => {
      fields.forEach((element: any, index: any) => {
        if (
          !body[fields[index][0]]?.toString() ||
          body[fields[index][0]] === '' ||
          body[fields[index][0]] === ' ' ||
          body[fields[index][0]]?.length === 0 ||
          ((typeof body[fields[index][0]] === 'string' ||
            body[fields[index][0]] instanceof String) &&
            !body[fields[index][0]].replace(/\s/g, '').length)
        ) {
          let errorMessage = `${fields[index][1]} is required`;
          errorMessage =
            errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);
          reject({ message: errorMessage, field: fields[index][1] });
        }
      });
      resolve(true);
    });
  }

  /**
   * This method verifies the email addresses in the form.
   *
   * @param fields
   * format of fields = [
   * [variable name present in body],[label of that fields]
   * ]
   * @param body
   * @returns
   */
  validateEmail(fields: any, body: any) {
    return new Promise((resolve, reject) => {
      fields.forEach((element: any, index: any) => {
        if (
          fields[index][0] === 'email' &&
          !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            body[fields[index][0]]
          )
        ) {
          reject({ message: 'Enter a valid email address' });
        }
      });
      resolve(true);
    });
  }

  /**
   * This method validates the password in the form.
   *
   * @param fields
   * format of fields = [
   * [variable name present in body],[label of that fields]
   * ]
   * @param body
   * @returns
   */
  validatePassword(fields: any, body: any) {
    return new Promise((resolve, reject) => {
      fields.forEach((element: any, index: any) => {
        if (
          body[fields[index][0]].length < 8 ||
          body[fields[index][0]].length > 20
        ) {
          reject('Enter a password in between 8 to 20 characters');
        }
      });
      resolve(true);
    });
  }

  /**
   * This method verifies the fields that should be greater than zero.
   *
   * @param fields
   * format of fields = [
   * [variable name present in body],[label of that fields]
   * ]
   * @param body
   * @returns
   */
  validateGreaterThanZero(fields: any, body: any) {
    return new Promise((resolve, reject) => {
      fields.forEach((element: any, index: any) => {
        if (body[fields[index][0]] <= 0) {
          let errorMessage = `${fields[index][1]} should be greater than zero`;
          errorMessage =
            errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);
          reject({ message: errorMessage, field: fields[index][1] });
        }
      });
      resolve(true);
    });
  }

  /**
   * This method verifies the fields that should be non-zero.
   *
   * @param fields
   * format of fields = [
   * [variable name present in body],[label of that fields]
   * ]
   * @param body
   * @returns
   */
  validateNonNegative(fields: any, body: any) {
    return new Promise((resolve, reject) => {
      fields.forEach((element: any, index: any) => {
        if (body[fields[index][0]] < 0) {
          let errorMessage = `${fields[index][1]} can not be negative`;
          errorMessage =
            errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);
          reject({ message: errorMessage, field: fields[index][1] });
        }
      });
      resolve(true);
    });
  }

  /**
   * This method verifies the fields that should be non-zero.
   *
   * @param fields
   *  format of fields = [
   * [variable name present in body],[label of that fields]
   * ]
   * @param body
   * @returns
   */
  validateLength(fields: any, body: any, minLength: number, maxLength: number) {
    return new Promise((resolve, reject) => {
      fields.forEach((element: any, index: any) => {
        if (body[fields[index][0]].length < minLength) {
          let errorMessage = `${fields[index][1]} can not be less than ${minLength}`;
          errorMessage =
            errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);
          reject({ message: errorMessage, field: fields[index][1] });
        } else if (body[fields[index][0]].length > maxLength) {
          let errorMessage = `${fields[index][1]} can not be greater than ${maxLength}`;
          errorMessage =
            errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);
          reject({ message: errorMessage, field: fields[index][1] });
        }
      });
      resolve(true);
    });
  }

  /**
   * This method verifies the uniqueness of fields.
   *
   * @param fields
   *  format of fields = [
   * [input value of that fields],[name of that field]
   * ]
   * @param body string[]
   * @returns
   */

  validateUniqueness(fields: any, body: any) {
    return new Promise((resolve, reject) => {
      fields.forEach((element: any, index: any) => {
        if (body.includes(fields[index][0])) {
          reject({
            message: `${fields[index][1]} is not unique`,
            field: `${fields[index][1]}`,
          });
        }
      });

      resolve(true);
    });
  }
  /**
   * this method check uniquness of the input from the given array
   * @param arr
   * @param code
   * @returns
   */

  checkUinqiness(arr: any, input: any, field: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (arr.includes(input)) {
        reject({ message: `${field} is not unique`, field: `${field}` });
      } else {
        resolve(true);
      }
    });
  }
}
