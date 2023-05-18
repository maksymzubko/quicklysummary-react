import { translations } from './translations';

const _t = (id: string, ...rest: any[]): [string, ...any[]] => {
  if (!id) {
    id = '_NOT_TRANSLATED_';
  }
  return [id, ...rest];
};

export const messages = {
  landing: {
  },
  header: {
    login: () => _t(translations.header.login, 'Login'),
    contactUs: () => _t(translations.header.contactUs, 'Contact us'),
    logout: () => _t(translations.header.logout, 'Logout'),
  },
  main: {
    dropFiles: () => _t(translations.main.dropFiles, 'Drop your file here'),
    uploadedFiles: () => _t(translations.main.uploadedFiles, 'Uploaded files'),
    actions: () => _t(translations.main.actions, 'Actions'),
    summary: () => _t(translations.main.summary, 'Summary'),
    sentences: () => _t(translations.main.sentences, '10 Sentences'),
    keywords: () => _t(translations.main.keywords, 'Main Keywords'),
    p_mentioned: () => _t(translations.main.p_mentioned, 'People Mentioned'),
    i_discussed: () => _t(translations.main.i_discussed, 'Issue Discussed'),
    custom: () => _t(translations.main.custom, 'Custom'),
    e_prompt: () => _t(translations.main.e_prompt, 'Enter your prompt'),
    start: () => _t(translations.main.start, 'Start'),
    showText: () => _t(translations.main.showText, 'Here will show all text from your file'),
    showSummary: () => _t(translations.main.showSummary, 'Here will show the general summary of the text above'),
  },
  contactUs:{
    contactUs: () => _t(translations.contactUs.contactUs, 'Contact us'),
    fields: () => _t(translations.contactUs.fields, 'Fill in the fields'),
    allowData: () => _t(translations.contactUs.allowData, 'I allow my personal data to be processed'),
    name: () => _t(translations.contactUs.name, 'Your Name'),
    message: () => _t(translations.contactUs.message, 'Message'),
  },
  buttons: {
    startBtn: () => _t(translations.buttons.startBtn, 'Get started'),
    start: () => _t(translations.buttons.start, 'Start'),
    downloadPdf: () => _t(translations.buttons.downloadPdf, 'Download as PDF'),
    send: () => _t(translations.buttons.send, 'Send'),
    register: () => _t(translations.buttons.register, 'Register'),
    login: () => _t(translations.buttons.login, 'Login'),
    continue: () => _t(translations.buttons.continue, 'Continue'),
    google: () => _t(translations.buttons.google, 'Continue with Google'),
    facebook: () => _t(translations.buttons.facebook, 'Continue with Facebook'),
    apple: () => _t(translations.buttons.apple, 'Continue with Apple'),
    goto: () => _t(translations.buttons.goto, 'Go to login page'),
  },
  login: {
    text1: () => _t(translations.login.text1, 'Login'),
    text2: () => _t(translations.login.text2, 'or create account'),
    text3: () => _t(translations.login.text3, 'or continue with email'),
    register: () => _t(translations.login.register, 'Register'),
    password: () => _t(translations.login.password, 'Password'),
    c_password: () => _t(translations.login.c_password, 'Confirm password'),
    email_already: () => _t(translations.login.email_already, 'This email is already taken'),
    incorrect_pass: () => _t(translations.login.incorrect_pass, 'Incorrect password'),
    email: () => _t(translations.login.email, 'Email'),
    f_password: () => _t(translations.login.f_password, 'Forgot password'),
  },
  google:{
    oops: () => _t(translations.google.oops, 'Oops..'),
    error: () => _t(translations.google.error, 'Having trouble trying to sign in with Google..'),
    authorized: () => _t(translations.google.authorized, 'Authorized'),
    redirect_msg: () => _t(translations.google.redirect_msg, 'You will be redirected in few seconds..'),
    loading: () => _t(translations.google.loading, 'Loading..'),
  }
};

export type MessageFunc = () => [string, ...any[]];
