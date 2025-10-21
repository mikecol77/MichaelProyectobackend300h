export class ApiResponse {
  static ok(data, message = 'OK') {
    return { ok: true, message, data };
  }
  static fail(message = 'ERROR', data = null) {
    return { ok: false, message, data };
  }
}
