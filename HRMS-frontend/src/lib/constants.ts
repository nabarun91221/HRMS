export const AcceptedImageMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
export const AcceptedImageExtensions = ['.jpeg', '.jpg', '.png', '.webp'];

export const AcceptedVideoMimeTypes = [
  // MP4 / Mobile
  'video/mp4',
  'video/3gpp', // .3gp
  'video/3gpp2', // .3g2

  // Web formats
  'video/webm',
  'video/ogg',

  // QuickTime / Apple
  'video/quicktime', // .mov
  'video/x-m4v', // .m4v

  // MPEG
  'video/mpeg',

  'video/x-msvideo', // .avi

  'video/x-ms-wmv', // .wmv
  'video/x-ms-asf', // .asf

  // Matroska
  'video/x-matroska', // .mkv

  'video/x-flv', // .flv

  'video/h264',
  'video/h265',
];

export const AcceptedVideoExtentionsTypes = [
  '.3gp',
  '.3g2',
  '.webm',
  '.ogv',
  '.mov',
  '.m4v',
  '.mpeg',
  '.mpg',
  '.avi',
  '.wmv',
  '.asf',
  '.mkv',
  '.flv',
  '.mp4',
  '.m4v',
  '.hevc',
];

export const AcceptedAllFileTypesMimeTypes = [
  'application/pdf', // .pdf
];

export const AllowedAllFileExtensions = ['.pdf'];

export const accessTokenName = process.env.NEXT_PUBLIC_TOKEN_NAME!;
export const refreshTokenName = process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME!;

export const MaxImageFileSize = 5 * 1024 * 1024;

export const MonthOptions = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
].map((month, index) => ({
  label: month,
  value: String(index + 1),
}));

const currentYear = new Date().getFullYear();

export const YearOptions = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i).map(year => ({
  label: String(year),
  value: String(year),
}));
