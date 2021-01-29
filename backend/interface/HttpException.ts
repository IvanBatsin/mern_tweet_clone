export class HTTPError extends Error {
  status: number;
  message: string;

  constructor(status: number = 500, message: string = 'Server Error') {
    super(message);
    this.status = status;
    this.message = message;
  }
}