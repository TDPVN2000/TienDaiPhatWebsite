export const EMAIL = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

export const PHONE = /^(\+84|\+81|0)[1-9]([0-9]{8,11})$/;

export const PASSWORD =
  /^(?=.*?[0-9])(?=.*?[A-Za-z])[A-Za-z0-9!@#$%^&*.]{8,25}$/;
export const KATAKANA = /^[\u30A0-\u30FF\u3005]+$/i;

export const JAPANESE = /[一-龯]|[ぁ-んァ-ン]|[Ａ-ｚ]/gi;

export const EMOJI =
  /[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/gu;
