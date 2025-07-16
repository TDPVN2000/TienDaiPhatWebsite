export const REGEX_EMAIL = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

export const REGEX_PHONE = /^[0-9]([0-9]{8,10})$/;

export const REGEX_PASSWORD =
  /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!@#$&()[\]\\`\-|?.;:+=,%*~^&/{}一<>_'"]).{8,32}$/;

export const REGEX_KATAKANA = /^[\u30A0-\u30FF\u3005\s]+$/i;

export const REGEX_JAPANESE = /[一-龯]|[ぁ-んァ-ン]|[Ａ-ｚ]/gi;

export const REGEX_EMOJI =
  /[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/gu;

export const FULL_NAME_REGEX = /^([a-zA-Z一-龯ぁ-んァ-ン]+\s*)*$/;

export const REGEX_PRICE = /^([0-9]+\s*)*$/;

export const REGEX_MENTIONS = /@\[([^\]]+)\]\((\d+_\d+)\)/gim;

export const REGEX_URL =
  /[(http(s)?):\\/\\/(www\\.)?a-zA-Z0-9@:%._\\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)/gi;

export const REGEX_IMG = /\.(jpeg|jpg|gif|png|webp|tif|bmp)/gi;

export const REGEX_YOUTUBE =
  /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;

export const REGEX_ONLINE_VIDEO =
  /^(http(s)?:\/\/)?((w){3}.)?.+(\.mp4|\.webm|\.ogg)$/;

export const REGEX_YOUTUBE_VIDEO =
  /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
