/**
 * A class that represents the response of a loader function.
 */
export default class LoaderResponse {
  data;
  isError;
  errorMessage;

  /**
   * Constructor of LoaderResponse.
   * @param data Any type of data.
   * @param error A JS built-in error object.
   */
  constructor(data, error) {
    this.data = data;
    this.isError = !!error;
    this.errorMessage = error?.message;
  }
}
