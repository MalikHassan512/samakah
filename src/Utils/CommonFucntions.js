export const socialStatusIntoEnglish = maritalStatus => {
  //   console.log('maritalStatus', maritalStatus);
  switch (maritalStatus) {
    case 'أعزب':
      return 'Single';
    case 'متزوج':
      return 'Married';
    case 'أرملة':
      return 'Widow';
    case 'مُطلّق':
      return 'Divorced';
    default:
      return '';
  }
};

export const genderIntoEnglish = gender => {
  switch (gender) {
    case 'ذكر':
      return 'Male';
    case 'أنثى':
      return 'Female';
    case 'آخر':
      return 'Other';
    default:
      return '';
  }
};
