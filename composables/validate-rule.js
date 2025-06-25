const validateRequired = val => !!val || '필수값 입니다.';

const validatePasswordConfirm = (password, passwordConfirm) => password === passwordConfirm || '비밀번호 값이 일치하지 않습니다.';

export {
  validateRequired,
  validatePasswordConfirm,
}