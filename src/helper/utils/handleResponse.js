import { logOut } from './common';

export const HandleSuccessResponse = res => {
  return new Promise(async (resolve, reject) => {
    // const response = res?.response;
    const response = res;
    switch (response?.status) {
      case 200:
        if (response?.title == 'success') {
          response.message = response?.message ?? 'Everything is OK';
          response.user_message =
            response?.user_message ?? 'Berhasil mendapatkan respon';
        } else if (response?.title == 'validation') {
          response.message = response?.message ?? 'Validation is not complete';
          response.user_message =
            response?.user_message ??
            'Beberapa parameter yang harus dipenuhi terlebih dahulu';
          response.is_validation = true;
        }
        resolve({
          ...response,
          code: 200,
        });
        return;
      case 201:
        resolve({
          ...response,
          code: 201,
          message: response?.message ?? 'Created',
          user_message: response?.user_message ?? 'Berhasil membuat data baru',
        });
        return;
      case 202:
        resolve({
          ...response,
          code: 202,
          message: response?.message ?? 'Accepted',
          user_message:
            response?.user_message ??
            'Permintaan berhasil dilakukan dan sedang dalam proses',
          is_still_processing: true,
        });
        return;
      case 203:
        resolve({
          ...response,
          code: 203,
          message: response?.message ?? 'Non-authoritative information',
          user_message:
            response?.user_message ?? 'Permintaan berhasil dilakukan',
          is_from_another_resource: true,
        });
        return;
      case 204:
        resolve({
          ...response,
          code: 204,
          message: response?.message ?? 'No Content',
          user_message:
            response?.user_message ?? 'Permintaan berhasil dilakukan',
          no_content: true,
        });
        return;
      case 205:
        resolve({
          ...response,
          code: 205,
          message: response?.message ?? 'Reset content',
          user_message:
            response?.user_message ?? 'Permintaan berhasil dilakukan',
          no_content: true,
          is_reset: true,
        });
        return;
      default:
        reject(
          new CustomError({
            ...response,
          }),
        );
        return;
    }
  });
};

export const HandleErrorResponse = err => {
  return new Promise(async (resolve, reject) => {
    const response = err?.response;
    console.log({response, err});
    switch (response?.status) {
      case 300:
        resolve(
          new CustomError({
            ...response,
            code: 300,
            message: response?.message ?? 'Multiple Choice',
            user_message:
              response?.user_message ??
              'Terdapat lebih dari satu response server',
          }),
        );
        return;
      case 301:
        resolve(
          new CustomError({
            ...response,
            code: 301,
            message: response?.message ?? 'Moved Permanently',
            user_message:
              response?.user_message ??
              'Gagal mencapai server, kemungkinan server telah dipindahkan',
          }),
        );
        return;
      case 302:
        resolve(
          new CustomError({
            ...response,
            code: 302,
            message: response?.message ?? 'Found',
            user_message:
              response?.user_message ??
              'Gagal mencapai server, server sedang di pindahkan sementara',
          }),
        );
        return;
      case 400:
        resolve(
          new CustomError({
            ...response,
            code: 400,
            message: response?.message ?? 'Bad request',
            user_message:
              response?.user_message ??
              'Terjadi kesalahan saat pengiriman permintaan',
            is_validation: response?.is_validation,
          }),
        );
        return;
      case 401:
        await logOut();
        reject(
          new CustomError({
            ...response,
            code: 401,
            message: response?.message ?? 'Unauthorized',
            user_message:
              response?.user_message ??
              'Maaf, akses membutuhkan login terlebih dahulu',
          }),
        );
        return;
      case 402:
        reject(
          new CustomError({
            ...response,
            code: 402,
            message: response?.message ?? 'Payment Required',
            user_message:
              response?.user_message ??
              'Selesaikan pembayaran anda terlebih dahulu',
          }),
        );
        return;
      case 403:
        reject(
          new CustomError({
            ...response,
            code: 403,
            message:
              response?.message ?? 'Access to that resource is forbidden',
            user_message:
              response?.user_message ??
              'Maaf, anda tidak dapat mengakses konten ini',
          }),
        );
        return;
      case 404:
        reject(
          new CustomError({
            ...response,
            code: 404,
            message: response?.message ?? 'Not found',
            user_message:
              response?.user_message ??
              'Maaf, konten yang anda cari tidak ditemukan',
          }),
        );
        return;
      case 405:
        reject(
          new CustomError({
            ...response,
            code: 405,
            message: response?.message ?? 'Method not allowed',
            user_message:
              response?.user_message ??
              'Maaf, pengiriman/penerimaan permintaan tidak diizinkan',
          }),
        );
        return;
      case 406:
        reject(
          new CustomError({
            ...response,
            code: 406,
            message: response?.message ?? 'Not acceptable response',
            user_message:
              response?.user_message ??
              'Maaf, permintaan anda tidak dapat diterima',
          }),
        );
        return;
      case 408:
        reject(
          new CustomError({
            ...response,
            code: 408,
            message: response?.message ?? 'Request timeout',
            user_message: response?.user_message ?? 'Maaf, waktu akses habis',
          }),
        );
        return;
      case 409:
        reject(
          new CustomError({
            ...response,
            code: 409,
            message: response?.message ?? 'Conflict',
            user_message:
              response?.user_message ?? 'Terjadi konflik saat melakukan proses',
          }),
        );
        return;
      case 410:
        reject(
          new CustomError({
            ...response,
            code: 410,
            message: response?.message ?? 'Gone',
            user_message:
              response?.user_message ??
              'Sumber daya telah dihapus atau dipindahkan',
          }),
        );
        return;
      case 411:
        reject(
          new CustomError({
            ...response,
            code: 411,
            message: response?.message ?? 'Length Required',
            user_message:
              response?.user_message ??
              'Terdapat permintaan yang belum dipenuhi',
          }),
        );
        return;
      case 412:
        reject(
          new CustomError({
            ...response,
            code: 412,
            message: response?.message ?? 'Precondition Failed',
            user_message:
              response?.user_message ?? 'Permintaan yang belum bisa dipenuhi',
          }),
        );
        return;
      case 415:
        reject(
          new CustomError({
            ...response,
            code: 415,
            message: response?.message ?? 'Unsupported Media Type',
            user_message:
              response?.user_message ?? 'Jenis media tidak didukung',
            is_validation: true,
          }),
        );
        return;
      case 500:
        reject(
          new CustomError({
            ...response,
            code: 500,
            message: response?.message ?? 'Internal server error',
            user_message:
              response?.user_message ??
              'Maaf, server kami sedang mengalami masalah\nMohon tunggu beberapa saat',
          }),
        );
        return;
      case 501:
        reject(
          new CustomError({
            ...response,
            code: 501,
            message: response?.message ?? 'Not implemented',
            user_message:
              response?.user_message ?? 'Maaf, server belum mendukung aksi ini',
          }),
        );
        return;
      case 502:
        reject(
          new CustomError({
            ...response,
            code: 502,
            message: response?.message ?? 'Bad Gateway',
            user_message:
              response?.user_message ??
              'Maaf, server pusat gagal dalam merespon',
          }),
        );
        return;
      case 503:
        reject(
          new CustomError({
            ...response,
            code: 503,
            message: response?.message ?? 'Service unavailable',
            user_message: response?.user_message ?? 'Maaf, server sedang padat',
            is_maintenance: response.is_maintenance,
          }),
        );
        return;
      case 504:
        reject(
          new CustomError({
            ...response,
            code: 504,
            message: response?.message ?? 'Gateway timeout',
            user_message:
              response?.user_message ??
              'Maaf, server pusat gagal menyelesaikan aksi ini',
          }),
        );
        return;
      case 505:
        reject(
          new CustomError({
            ...response,
            code: 505,
            message: response?.message ?? 'HTTP Version Not Supported',
            user_message:
              response?.user_message ??
              'Maaf, server tidak mendukung versi HTTP yang digunakan',
          }),
        );
        return;
      default:
        if (response === undefined) {
          if (err.message?.includes('timeout')) {
            reject(
              new CustomError({
                code: 408,
                message: response?.message ?? 'Request timeout',
                user_message:
                  response?.user_message ?? 'Maaf, waktu akses habis',
              }),
            );
          } else if (err.message?.includes('Network Error')) {
            reject(
              new CustomError({
                message: response?.message ?? 'Network Error',
                user_message:
                  response?.user_message ??
                  'Maaf, Terjadi kesalahan pada server',
              }),
            );
          } else {
            reject(err);
          }
        } else {
          reject(err);
        }
        return;
    }
  });
};

export class CustomError extends Error {
  constructor(e) {
    super(e);
    this.code = e.code;
    this.name = e?.name ?? 'ErrorHttpRequest';
    this.message = e?.message;
    this.user_message = e?.user_message;
  }
}
